# Design system

The site is art-directed as a **warm editorial gallery**: porcelain paper, ink
type, one cobalt accent, soft geometry, and a single dark plate for the live
mosaic. It should feel like a small printed monograph, not a SaaS landing page.

## Palette

| Token | Value | Use |
| --- | --- | --- |
| `--bg` | `#f4f2ec` | Page field |
| `--bg-deep` | `#ebe8df` | Footer, inset surfaces |
| `--surface` | `#fbfaf6` | Cards, tinted sections |
| `--surface-raised` | `#ffffff` | Raised panels |
| `--text` | `#141519` | Primary text |
| `--text-muted` | `#5e6067` | Secondary copy |
| `--text-dim` | `#86878d` | Tertiary labels |
| `--border` | `#dcd8cd` | Hairlines |
| `--border-strong` | `#c7c2b5` | Secondary button borders |
| `--accent` | `#1f4fd8` | Actions, markers, links |
| `--accent-hover` | `#173fb3` | Hover state |
| `--accent-soft` | `#e8edfb` | Check chips, save badge |
| `--dark` | `#0d0f13` | Mosaic plate, final CTA |
| `--dark-text` | `#f6f3eb` | Type on dark |

Cobalt is a working accent, not a theme. It appears in the kicker rule, links,
the primary button, the phase dots and the mosaic pause control. It never fills
a large area except the primary button.

## Typography

- **General Sans** for everything. Self-hosted WOFF2, weights 400 / 500 / 600 /
  700, loaded through `next/font/local`.
- Display headlines use 600 weight, `letter-spacing: -0.035em` to `-0.052em`,
  and a line height near `0.98`.
- Body copy is `1rem / 1.6`, capped at `64ch`. Secondary copy uses
  `--text-muted`.
- Prices, day ranges and lock numbers use `font-variant-numeric: tabular-nums`.
- No all-caps labels, no second display typeface, no gradient text.

## Layout

- Page container: `76rem` max, gutters `clamp(20px, 5vw, 48px)`.
- Section rhythm: `--section-y: clamp(4.5rem, 8vw, 8rem)`; tight sections use
  `clamp(3.5rem, 6vw, 5.5rem)`.
- Radii: 10 / 18 / 28 / 40px plus full pills. Large media and cards use 28–40px.
- Rules are 1px and low contrast. Sections are separated by rhythm and hairlines,
  not by boxing every block.
- Shadows are soft and rare: one for the mosaic plate, one for the offer card.

## Page rhythm

1. **Hero** — kicker, oversized headline, short lead, two actions, one note, and
   the live Vignette Bloom mosaic.
2. **The three locks** — an editorial table: number, lock name, description,
   week and outcome.
3. **The 21 days** — three phases on a ruled timeline, then one practice note.
4. **One reader** — a single photo, oversized quote, avatar and honest
   disclaimer on a tinted band.
5. **The edition** — split product card with the hardcover, inclusions, price,
   refund copy and author.
6. **FAQ** — a two-column layout with native button disclosures.
7. **Final CTA** — one dark panel, one action, one line of terms.
8. **Footer** — wordmark, two short link groups, legal line, copyright.
9. **Sticky buy bar** — mobile only, appears after the hero.

## Motion

- One easing curve: `cubic-bezier(0.22, 1, 0.36, 1)`.
- Durations: 140ms for color and border, 220ms for layout-adjacent changes,
  400ms for larger transitions.
- No repeated scroll-triggered fades. The page loads still.
- The mosaic runs at a 30fps cap, pauses offscreen and when the tab is hidden.
- `prefers-reduced-motion: reduce` starts the mosaic paused and removes
  non-essential transitions. The pause/play control lets the reader opt in.

## Accessibility

- Body text meets WCAG AA on the paper field; muted text stays above 4.5:1.
- Focus rings are 2px cobalt with a 3px offset.
- A skip link is the first focusable element.
- Buttons and nav links are at least 44px tall on touch.
- The mosaic canvas has `role="img"` and a descriptive label; a real image
  fallback sits underneath.
- The mobile menu is a disclosure with `aria-expanded`, `aria-controls`, Escape
  to close, and a body scroll lock.
- Prices are paired with visible labels, not color alone.

## Image treatment

- The hero uses a 4:3 dark plate with a 28px radius, a 1px white border at 8%
  opacity, and a deep shadow. The source photo is cropped with cover behavior.
- Reader and product photography use soft 18–28px corners.
- Product photography is displayed with `object-fit: cover`; choose a source
  whose subject survives the column crop. The offer uses the portrait
  `hardcover.jpg` rather than the wide `book-and-journal.jpg`.
