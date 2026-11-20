# UI/UX DESIGN RULES FOR CODING AGENTS

> Drop this file into your agent's context (e.g. as `AGENTS.md`, `CLAUDE.md`, `.cursorrules`, or paste it at the top of your prompt).
> Instruction to the agent: **Read this entire file before writing any UI code. Follow it literally. When a rule says MUST or NEVER, there are no exceptions.**

---

## HOW TO USE THESE RULES (the process)

Do these steps in order. Do not skip step 1 or step 2.

1. **Write a design plan first (max 15 lines).** Before any code, write down:
   - What the product is, who uses it, and the single main job of this screen.
   - Palette: 4-6 named hex colors (Rule 1).
   - Fonts: 1 or 2 families and their roles (Rule 2).
   - Layout: one sentence + a small ASCII wireframe (Rule 3).
   - The ONE memorable element of the design (the "hero move").
2. **Check the plan against the Anti-Slop List** (bottom of this file). If any part matches a default, change it and say what you changed.
3. **Define design tokens as CSS variables** (Rule 1) BEFORE building components.
4. **Build components using only the tokens.** Never hard-code a color, font size, spacing or radius inside a component.
5. **Run the Pre-Ship Checklist** (bottom of this file) and fix every failure.

**Golden principle:** Spend your boldness in ONE place. One element is memorable; everything around it is quiet, consistent, and disciplined. Modern good design is *restraint plus precision*, not more effects.

---

# RULE 1: BUILD A TOKEN SYSTEM, THEN OBEY IT
### (Color, spacing, radius, shadow: decided once, reused everywhere)

Why: Amateur UI looks bad because every value is random (13px here, 17px there, 5 different greys). Professional UI looks good because it uses a *small, fixed set of values* repeatedly. Consistency is 70% of "looks expensive."

## 1.1 Color

**MUST:**
- Use **4-6 base colors**, no more:
  1. `--bg` (page background)
  2. `--surface` (cards, panels, inputs, slightly different from bg)
  3. `--text` (primary text)
  4. `--text-muted` (secondary text, ~60% emphasis)
  5. `--accent` (ONE brand/action color)
  6. `--border` (very subtle lines)
- Plus status colors only when needed: `--success`, `--warning`, `--danger`.
- Follow the **60-30-10 rule**: 60% background neutrals, 30% surface/secondary, 10% accent. The accent is for primary actions, links, active states and key data, nothing else.
- **Pick the palette from the subject matter**, not from habit. A finance dashboard, a children's app, a bakery, and a developer tool must look different. Ask: "What colors exist in this product's real world?"
- Build **neutrals with a slight tint** toward your accent hue (e.g. a cool grey if the accent is blue). Never use pure `#000` text on pure `#fff` (use e.g. `#14161a` on `#fafafa`) unless the brief demands maximum contrast.
- Support **dark mode properly** if applicable: don't just invert. In dark mode, surfaces get *lighter* as they rise (bg `#0f1115` → surface `#171a21` → raised `#1e222b`), text is off-white (not pure white), accent is slightly desaturated/lighter.
- Contrast: body text **>= 4.5:1**, large text and UI icons **>= 3:1** against their background.

**NEVER:**
- Never use a rainbow of colors. One accent. Period.
- Never use the purple-to-blue / pink-to-orange gradient on everything. Gradients are allowed only if they serve the brief, and then only subtle (two close hues) or used in ONE place.
- Never use the stock AI palettes (see Anti-Slop List).
- Never convey meaning by color alone (add icon or text for errors/success).

## 1.2 Spacing scale

**MUST** use only multiples of 4px, from this scale:

```
4  8  12  16  24  32  48  64  96  128
```

- Inside components (padding, gaps): 4-24.
- Between components: 16-48.
- Between page sections: 64-128.
- **Related things are close; unrelated things are far.** The gap between groups must be clearly larger than the gap inside groups (at least 2x). This alone fixes most "messy" layouts.

## 1.3 Radius (one system, not one value)

**MUST** pick a radius scale tied to element size:

```
--radius-sm: 6px;    /* tags, small buttons, inputs */
--radius-md: 10px;   /* buttons, inputs, small cards */
--radius-lg: 16px;   /* cards, panels, modals */
--radius-full: 999px;/* pills, avatars */
```

- Nested rounded elements: **inner radius = outer radius − padding** (a card with 16px radius and 8px padding has inner elements at 8px).
- Pick a personality and commit: sharp (0-4px), soft (8-16px), or pill. Don't mix all three randomly.

## 1.4 Shadows and depth

**MUST:**
- Use **at most 3 elevation levels** and define them as tokens.
- Make shadows **soft, layered and low-opacity**, tinted toward the background hue, not a grey `rgba(0,0,0,.1)` blob on everything.
- Prefer **borders + subtle surface color differences** for most separation. Use shadows only for things that truly float (dropdowns, modals, popovers, sticky headers).

**NEVER** put a shadow on every card. If everything floats, nothing does.

## 1.5 Copy-paste starter tokens (adapt the values to the project; keep the structure)

```css
:root {
  /* Color (EXAMPLE values: choose your own from the subject matter) */
  --bg: #f7f8fa;
  --surface: #ffffff;
  --surface-raised: #ffffff;
  --text: #14161a;
  --text-muted: #5b6270;
  --border: #e4e7ec;
  --accent: #2f5bea;
  --accent-hover: #2449c7;
  --accent-contrast: #ffffff;   /* text on accent */
  --success: #178a52;
  --warning: #b86e00;
  --danger: #d1332e;

  /* Spacing */
  --space-1: 4px;  --space-2: 8px;  --space-3: 12px; --space-4: 16px;
  --space-5: 24px; --space-6: 32px; --space-7: 48px; --space-8: 64px;
  --space-9: 96px; --space-10: 128px;

  /* Radius */
  --radius-sm: 6px; --radius-md: 10px; --radius-lg: 16px; --radius-full: 999px;

  /* Elevation */
  --shadow-1: 0 1px 2px rgb(20 22 26 / 0.06);
  --shadow-2: 0 4px 12px rgb(20 22 26 / 0.08), 0 1px 3px rgb(20 22 26 / 0.06);
  --shadow-3: 0 16px 40px rgb(20 22 26 / 0.14), 0 4px 12px rgb(20 22 26 / 0.08);

  /* Motion (see Rule 4) */
  --ease-out: cubic-bezier(0.22, 1, 0.36, 1);
  --dur-fast: 120ms; --dur-base: 200ms; --dur-slow: 360ms;
}

@media (prefers-color-scheme: dark) {
  :root {
    --bg: #0f1115;
    --surface: #171a21;
    --surface-raised: #1e222b;
    --text: #eceef2;
    --text-muted: #9aa1ae;
    --border: #2a2f3a;
    --accent: #6f8cff;
    --accent-hover: #8aa0ff;
    --accent-contrast: #0f1115;
  }
}
```

---

# RULE 2: TYPOGRAPHY AND HIERARCHY DO MOST OF THE WORK
### (Type carries personality; hierarchy tells the eye where to go)

Why: Most "AI-looking" UI has flat hierarchy: everything is the same size, same weight, same importance. Good UI makes it instantly obvious what to look at first, second, third.

## 2.1 Fonts

**MUST:**
- Use **one font family, or two that are clearly different** (e.g. a characterful display face + a neutral text face). Never three.
- Choose fonts **deliberately for the subject**, not the first thing that comes to mind. Free, high-quality options (Google Fonts / Fontshare / system):
  - Neutral UI sans: *Inter*, *Geist*, *DM Sans*, *Manrope*, *Plus Jakarta Sans*, *Instrument Sans*, *Figtree*, *Outfit*
  - Characterful display: *Space Grotesk*, *Sora*, *Bricolage Grotesque*, *Fraunces*, *Newsreader*, *Playfair Display* (use sparingly), *Syne*, *Unbounded*
  - Mono (only for real code/data): *JetBrains Mono*, *IBM Plex Mono*, *Geist Mono*
  - Safe fallback stack: `system-ui, -apple-system, "Segoe UI", Roboto, sans-serif`
- Always load fonts with `font-display: swap` and give a real fallback stack.
- Limit to **3-4 font weights** total (e.g. 400, 500, 600, 700).

## 2.2 Type scale

**MUST** use a fixed modular scale (ratio ~1.25). Use `clamp()` so it's fluid:

```css
:root {
  --text-xs:  0.75rem;                               /* 12px captions */
  --text-sm:  0.875rem;                              /* 14px secondary UI */
  --text-base:1rem;                                  /* 16px body (never smaller on mobile) */
  --text-lg:  1.125rem;                              /* 18px lead text */
  --text-xl:  clamp(1.25rem, 1.1rem + 0.6vw, 1.5rem);
  --text-2xl: clamp(1.5rem, 1.2rem + 1.2vw, 2rem);
  --text-3xl: clamp(1.875rem, 1.4rem + 2vw, 2.75rem);
  --text-4xl: clamp(2.25rem, 1.5rem + 3.2vw, 4rem);  /* hero only */
}
body { font-size: var(--text-base); line-height: 1.6; }
h1,h2,h3 { line-height: 1.1; letter-spacing: -0.02em; text-wrap: balance; }
p { max-width: 65ch; text-wrap: pretty; }
```

**Rules of thumb:**
- Body text: 16px minimum, `line-height` 1.5-1.7.
- Headings: `line-height` 1.05-1.25 and **slightly negative letter-spacing** (`-0.01em` to `-0.03em`) for large sizes.
- Paragraph width: **45-75 characters** (`max-width: 65ch`). Never full-width paragraphs on desktop.
- Large text gets tighter tracking, small uppercase text gets looser (but see "NEVER" below).
- Use `font-variant-numeric: tabular-nums` for tables, prices, stats, and anything that changes.
- Left-align body text. Center only short headlines or short single-line blurbs. Never center paragraphs.

## 2.3 Hierarchy: the squint test

**MUST:** Every screen has **exactly ONE primary focal point** (usually one headline or one primary action). Blur your eyes (or imagine): you should see 1 biggest thing, 2-3 medium things, and the rest quiet.

Create hierarchy with these tools, **in this priority order**:
1. **Size** (biggest lever)
2. **Weight** (600-700 vs 400)
3. **Color/contrast** (`--text` vs `--text-muted`)
4. **Space** (isolate important things with whitespace)

Don't create hierarchy by making everything bold, or by using 6 colors.

- **De-emphasize instead of over-emphasizing**: to make the important thing stand out, make the secondary things quieter (muted color, smaller size), not louder.
- **Buttons:** exactly **one primary button per view/section**. Others are secondary (outlined/tinted) or tertiary (text-only).

## 2.4 NEVER (typography tells that scream "AI-generated")

- NEVER put an ALL-CAPS tiny tracked-out "eyebrow" label above every heading.
- NEVER highlight a single word in a headline with a different color/italic/gradient as a default move.
- NEVER add a decorative label, pill, or tag above a section title "just because." Add it only if it carries real information.
- NEVER use numbered markers ("01 / 02 / 03") unless the content is a true sequence.
- NEVER append "→" to every link/button.
- NEVER use monospace for generic small labels as a "techy" costume.
- NEVER use gradient-filled text as decoration on body-level headings.
- NEVER use more than 2 font families.

---

# RULE 3: LAYOUT IS STRUCTURE, NOT A PILE OF CARDS
### (Grid, whitespace, alignment, and responsive behavior)

Why: The #1 giveaway of low-effort UI is content chopped into identical rounded cards in a 3-column grid with icons on top. Real layouts have rhythm, variation, and a reason for every box.

## 3.1 Foundations

**MUST:**
- Use a **12-column grid** (or CSS Grid with `repeat(auto-fit, minmax(...))`) and a **max content width** (typically 1120-1280px; reading content ~680px).
- Use **generous whitespace**. When in doubt, add MORE space, not less. Section vertical padding on desktop: 96-128px; mobile: 48-64px.
- Establish **strong alignment**: pick a left edge and align to it. Elements that look "almost aligned" look broken.
- **Design mobile-first.** Build the 375px layout, then enhance at 640 / 768 / 1024 / 1280px. Touch targets **>= 44x44px**.
- Use modern CSS: `display: grid`, `flex`, `gap`, `clamp()`, `aspect-ratio`, container queries, `min()`/`max()`, `100dvh` (not `100vh`) for full-height mobile sections.
- Include in the base CSS:
  ```css
  *, *::before, *::after { box-sizing: border-box; }
  html { -webkit-text-size-adjust: 100%; }
  body { margin: 0; background: var(--bg); color: var(--text); font-family: var(--font-sans); -webkit-font-smoothing: antialiased; }
  img, svg, video { max-width: 100%; display: block; }
  ```
- **Wide content (tables, code, charts) scrolls inside its own container** (`overflow-x: auto`). The page body must NEVER scroll sideways.

## 3.2 Make layouts that are not templates

**MUST:**
- **Vary the structure between sections.** Don't repeat "centered heading + 3 cards" down the page. Mix: a split section (text left, visual right), a full-bleed band, an asymmetric grid, a big single statement, a list/table, a feature with a real UI screenshot or live demo.
- **Cards only when items are truly separate, repeated objects** (products, posts, team members). Otherwise use plain sections separated by space, a single divider, or a list. If you do use cards, vary their size to show importance (one large featured + smaller supporting).
- **Open with the most characteristic thing in the subject's world** (a live product demo, a striking real image, a bold statement, an interactive element, real data) instead of the default "big headline + subtitle + two buttons + blob gradient."
- Use **real or realistic content** to drive layout. Layout should be built around what the content actually is.

## 3.3 App/dashboard layouts

- Structure: **navigation (sidebar or top bar) -> page header (title + primary action) -> content**.
- Sidebar width 220-280px; collapse to a drawer/bottom bar on mobile.
- Tables: left-align text, right-align numbers, sticky header, row hover, adequate row height (44-56px), zebra stripes only if dense.
- Use **progressive disclosure**: show the essentials, hide advanced options in menus, drawers, tabs, or "More" sections.
- Show data with the right visual: trends -> line; comparison -> bar; parts of a whole (max 5) -> stacked bar/donut; single KPI -> big number + small delta. Label axes, remove chart junk (heavy gridlines, 3D, rainbow).

## 3.4 Navigation and wayfinding

- The user must always know: **where am I, where can I go, what can I do here.**
- Highlight the active nav item clearly (accent color, weight, or indicator bar), not just a slight tint.
- Sticky header OK, but keep it slim (56-72px) and let it respect `env(safe-area-inset-top)` on mobile.
- Breadcrumbs for 3+ levels of depth.

## 3.5 Images and icons

- **One icon set only** (Lucide, Phosphor, Heroicons, Tabler), one stroke width, one size system (16/20/24px). NEVER use emoji as UI icons.
- Icons accompany labels; they don't replace them unless universally understood (close, search, menu).
- Use real photography or illustration with a consistent style, or no images at all. NEVER use random stock-looking blobs, abstract gradient orbs, or generic "3D shapes" as filler.
- Always set `alt` text, `width`/`height` (prevents layout shift), and `loading="lazy"` below the fold.

---

# RULE 4: EVERY INTERACTION HAS A STATE, AND MOTION MEANS SOMETHING
### (Dynamic components that feel alive, not decorated)

Why: A static screenshot can look fine, but quality is felt in interaction. Missing states and random animations are the biggest difference between "demo" and "product."

## 4.1 Every interactive element MUST have ALL these states

| State | Requirement |
|---|---|
| **Default** | Clearly looks clickable/editable |
| **Hover** | Subtle change (background shift, border, slight lift). Only on devices with hover: `@media (hover: hover)` |
| **Focus-visible** | **Visible focus ring** for keyboard users: `outline: 2px solid var(--accent); outline-offset: 2px;` NEVER `outline: none` without a replacement |
| **Active/pressed** | Immediate feedback, e.g. `transform: scale(0.98)` or darker bg |
| **Disabled** | Reduced opacity (~0.45), `cursor: not-allowed`, `aria-disabled`, no hover effects |
| **Loading** | Spinner or skeleton; button shows loading text and is disabled to prevent double-submit |
| **Error** | Red border + icon + specific message beneath the field |
| **Success** | Confirmation (toast, inline check, or changed button text) |

**Data views MUST also have:**
- **Loading state:** use **skeleton placeholders** shaped like the final content (not a lone spinner on a blank page).
- **Empty state:** short explanation + a clear action ("No projects yet. Create your first project."). Never a blank area.
- **Error state:** what happened + how to fix it + a retry button.

## 4.2 Motion rules

**MUST:**
- Motion has a **purpose**: show a change, guide attention, confirm an action, or give spatial context (where something came from / went).
- Durations: micro-interactions **100-200ms**, overlays/menus **200-300ms**, page-level transitions **300-500ms**. Nothing over 600ms except a single intentional hero moment.
- Easing: decelerate when entering (`cubic-bezier(0.22, 1, 0.36, 1)`), accelerate when leaving. NEVER default `linear` for UI movement.
- Animate **only `transform` and `opacity`** (GPU-friendly). Don't animate `width`, `height`, `top`, `left`.
- **Always honor reduced motion:**
  ```css
  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; scroll-behavior: auto !important; }
  }
  ```
- Allow **at most ONE orchestrated entrance moment** per page (e.g. a staggered hero reveal on load). Everything else responds to the user's action.

**NEVER:**
- NEVER fade-and-slide-up every section as you scroll. This is the most common generic tell.
- NEVER add hover lift + shadow + scale to every card.
- NEVER use infinite looping decorative animations (pulsing glows, floating blobs, spinning gradients) unless the brief asks for it.
- NEVER block the user with a long animation before they can act.
- NEVER use parallax/scroll-jacking by default.

## 4.3 Component recipes (implement exactly like this, then restyle with tokens)

### Button
```css
.btn {
  display: inline-flex; align-items: center; justify-content: center; gap: var(--space-2);
  min-height: 44px; padding: 0 var(--space-5);
  font: 600 var(--text-sm)/1 var(--font-sans);
  border-radius: var(--radius-md); border: 1px solid transparent;
  cursor: pointer; user-select: none;
  transition: background var(--dur-fast) var(--ease-out), transform var(--dur-fast) var(--ease-out), box-shadow var(--dur-fast) var(--ease-out);
}
.btn-primary { background: var(--accent); color: var(--accent-contrast); }
.btn-primary:hover { background: var(--accent-hover); }
.btn-secondary { background: transparent; color: var(--text); border-color: var(--border); }
.btn-secondary:hover { background: var(--surface); }
.btn-ghost { background: transparent; color: var(--text-muted); }
.btn:active { transform: scale(0.98); }
.btn:focus-visible { outline: 2px solid var(--accent); outline-offset: 2px; }
.btn[disabled], .btn[aria-disabled="true"] { opacity: .45; cursor: not-allowed; pointer-events: none; }
```
- Button labels are verbs: "Save changes," "Create project," "Send invite." NEVER "Submit," "Click here," or "OK."

### Text input
- **Label above the field, always visible** (never placeholder-only labels). Placeholder is an example, not an instruction.
- Height 44-48px, `padding: 0 12-16px`, 1px border `--border`, radius `--radius-md`.
- Focus: border becomes `--accent` + a soft 3px ring (`box-shadow: 0 0 0 3px color-mix(in srgb, var(--accent) 25%, transparent)`).
- Error: border `--danger`, message below in `--danger` with an icon, linked with `aria-describedby`. Validate on blur, not on every keystroke.
- Use correct `type`, `inputmode`, `autocomplete` attributes. Font-size >= 16px (prevents iOS zoom).

### Modal / dialog
- Use native `<dialog>` or a proper accessible implementation: **focus trap, close on Esc, close on backdrop click, return focus to the trigger, `aria-modal`, scroll lock.**
- Entrance: fade + scale from 0.97 to 1 in 200ms. Backdrop: `rgb(0 0 0 / 0.5)` with optional `backdrop-filter: blur(4px)`.
- Max width 480-560px; full-screen sheet on mobile. Title + one sentence + 1 primary and 1 secondary action; the destructive action is clearly labeled ("Delete project"), not "Yes."

### Toast / notification
- Bottom-right (desktop) or top/bottom center (mobile), auto-dismiss in 4-6s (not for errors), `role="status"` / `aria-live="polite"`, with an Undo action for reversible operations.

### Dropdown / menu / tabs / accordion / tooltip
- Fully keyboard accessible (Arrow keys, Home/End, Esc, Enter/Space), proper ARIA roles, hover AND focus triggers for tooltips, delay ~300ms for tooltips.
- Tabs: active tab has an indicator that *slides* between tabs (transform), not a hard jump.

### Toggle / checkbox / radio
- Use real `<input>` elements (visually restyled), never fake `div`s without roles. Hit area >= 44px including the label.

### Optimistic UI
- For fast actions (like, toggle, reorder), update the UI instantly and reconcile with the server after. Show an error and roll back if it fails.

## 4.4 Feedback timing
- < 100ms: feels instant, no indicator needed.
- 100ms-1s: subtle indicator (button spinner).
- 1s-10s: skeleton/progress with context.
- \> 10s: determinate progress bar + ability to cancel + estimated time.

---

# RULE 5: SPECIFIC WORDS, ACCESSIBLE BY DEFAULT, POLISHED TO THE LAST PIXEL
### (Content, accessibility, and the finishing pass)

Why: Even a beautiful layout reads as fake with "Lorem ipsum," "Revolutionize your workflow," and 'Feature One / Feature Two / Feature Three.' And an inaccessible UI is a broken UI.

## 5.1 Copywriting (words are design material)

**MUST:**
- Write **real, specific copy tied to the subject.** Ask "what does this person need to understand or do here?" Then say exactly that, once, briefly.
- Name things in the **user's language** ("Your notifications"), not the system's ("Webhook configuration").
- Use **sentence case** everywhere (headings, buttons, menu items), not Title Case Every Word.
- **Active voice and verb-first actions.** The same action has the same name across the whole flow (button "Publish" -> toast "Published").
- Headlines say what the thing *is or does*, concretely. Subtext adds one new piece of info, not a rephrase of the headline.
- **Error messages:** say what happened, why if known, and how to fix. No blame, no apologies, no "Oops!", no jargon, no error codes alone.
  - Bad: "Something went wrong."  Good: "We couldn't save your changes because you're offline. They'll sync when you reconnect."
- **Empty states** are invitations to act, not decoration.
- Realistic placeholder data: real-looking names, varied lengths, plausible numbers (not "John Doe," "$1,000," "Lorem ipsum," "Acme Inc." everywhere). Include a long name and a missing value to test layouts.

**NEVER use these filler phrases:** "Revolutionize," "Supercharge," "Unlock the power of," "Seamless," "Elevate your," "Next-generation," "Cutting-edge," "All-in-one solution," "Take X to the next level," "Welcome to the future of…"

## 5.2 Accessibility (non-negotiable quality floor)

**MUST:**
- Use **semantic HTML**: `<header> <nav> <main> <section> <article> <footer> <button> <a> <ul> <label> <table>`. Buttons do actions; links navigate. Never `<div onclick>`.
- One `<h1>` per page; heading levels in order (don't skip for styling; style with classes).
- Every input has a `<label>`. Every image has meaningful `alt` (or `alt=""` if decorative). Icon-only buttons have `aria-label`.
- Full **keyboard operability** in logical tab order with visible focus (Rule 4).
- **Color contrast** per Rule 1. Test text on images/gradients.
- Support **200% zoom** and text resizing without breaking layout (use `rem`, not `px`, for font sizes).
- Respect `prefers-reduced-motion` and `prefers-color-scheme`.
- Add a "Skip to content" link for pages with large navigation.
- Dynamic updates announced with `aria-live`. Form errors associated with fields.

## 5.3 Performance as UX

- No layout shift (reserve space for images/embeds). Lazy-load below-the-fold media. Subset/limit fonts. Avoid heavy JS libraries for simple effects.
- Perceived speed: skeletons, optimistic UI, instant transitions.

## 5.4 The finishing pass (pixel polish)

Do this at the end, every time:
- **Optical alignment:** icons next to text are vertically centered; baseline-align mixed font sizes in a row.
- **Consistent borders:** all 1px, all `--border` (no random greys).
- **Uniform component heights:** buttons and inputs in the same row share the same height.
- **Truncation:** long text uses `text-overflow: ellipsis`, `line-clamp`, or wraps gracefully. Nothing overflows its container.
- **Selection and scrollbars:** set `::selection` to a tint of the accent; thin custom scrollbars optional.
- Set `<meta name="theme-color">`, a proper `<title>`, favicon, and meta description.
- Use the typographic apostrophe/quotes (’ “ ”) in visible text; use `&nbsp;` to prevent orphan words in headings if needed (or `text-wrap: balance`).
- Test: 375px, 768px, 1280px, 1920px widths; dark/light mode; keyboard-only; with 3x longer text; with no data.

---

# THE ANTI-SLOP LIST (if your design contains these by default, REDO it)

These are the default outputs of low-effort AI generation. Avoid them unless the brief explicitly asks for them:

**Palettes**
- Warm cream background (`#F4F1EA`-ish) + high-contrast serif + terracotta/clay accent.
- Near-black background + single acid-green / neon accent.
- Purple/indigo -> pink/blue gradient backgrounds, gradient text, glowing orbs, blurred blobs.
- Pure `#000`/`#111` black with pure white and one random bright color.

**Layout**
- Hero: centered giant headline + grey subtitle + two buttons (one filled, one outline) + gradient blob.
- Row of 3 identical rounded cards with icon-in-a-colored-square on top, bold title, two lines of grey text.
- Identical "centered heading + grid" sections stacked down the page.
- Big number + small label + gradient accent "stats strip" ("10k+ users / 99.9% uptime / 24/7 support").
- Testimonials with 3 identical cards and fake avatars; logo cloud of made-up companies.
- Every card has the same radius, same shadow, same hover lift.
- Newspaper-style hairline-rules layout with zero radius used for subjects that aren't editorial.

**Chrome and typography**
- ALL-CAPS tracked eyebrow label above every heading.
- Meta strings joined with middle dots (A · B · C); labels formatted like "WORD — fragment."
- Single highlighted/italic word in headline.
- Monospace for small labels as a stylistic costume.
- "→" at the end of every link or button; emoji as icons; numbered "01 02 03" on non-sequences.
- Glassmorphism (blurry translucent panels) on everything.

**Motion**
- Fade-up on scroll for every section; scale+shadow hover on every card; pulsing "live" dots with no live data; infinite floating decoration.

**Copy**
- "Lorem ipsum," "Feature one," "John Doe," "Acme," and generic hype phrases ("Revolutionize your workflow with AI-powered…").

> Remember: these are not forbidden forever; they're forbidden **as defaults**. If the brief, subject, or audience genuinely calls for one, use it deliberately, in one place, and well. If the user's brief explicitly specifies a look, the brief always wins.

---

# PRE-SHIP CHECKLIST (run this before declaring done)

**Tokens and consistency**
- [ ] All colors come from CSS variables; no stray hex values in components.
- [ ] Only spacing values from the 4px scale. Only radius values from the radius scale.
- [ ] Max 1 accent color; max 3 shadow levels; max 2 font families; max 4 weights.

**Hierarchy and layout**
- [ ] Squint test passes: one clear focal point per screen.
- [ ] Exactly one primary button per view/section.
- [ ] Group spacing is clearly larger than intra-group spacing.
- [ ] Sections differ in structure; not everything is a card grid.
- [ ] Paragraphs are <= ~65ch wide; body text >= 16px.
- [ ] No horizontal scroll at 375px; touch targets >= 44px.

**Interaction**
- [ ] Every interactive element has hover, focus-visible, active, disabled states.
- [ ] Forms: visible labels, inline validation, specific errors, loading state on submit.
- [ ] Every data view has loading (skeleton), empty, and error states.
- [ ] Modals/menus trap focus, close on Esc, return focus.
- [ ] Animations use transform/opacity only; one orchestrated entrance max; `prefers-reduced-motion` respected.

**Content and accessibility**
- [ ] No lorem ipsum, no generic hype, sentence case, verb-first buttons.
- [ ] Semantic HTML, one `<h1>`, alt text, aria-labels on icon buttons.
- [ ] Contrast >= 4.5:1 body, >= 3:1 large text/icons; meaning never by color alone.
- [ ] Works in dark and light mode (if supported) and at 200% zoom.

**Anti-slop**
- [ ] Zero items from the Anti-Slop List appear as unexamined defaults.
- [ ] I removed at least one decorative element that wasn't earning its place.
- [ ] There is ONE memorable, deliberate design move, and everything else is quiet.

---

# QUICK REFERENCE: THE 5 RULES IN ONE SCREEN

1. **TOKENS FIRST:** 4-6 colors, 4px spacing scale, a radius scale, 3 shadow levels, all as CSS variables. Pick the palette from the subject, not from habit.
2. **TYPE + HIERARCHY:** 1-2 fonts, a fixed scale, 65ch lines, one focal point per screen, one primary button per view. Size > weight > color > space.
3. **LAYOUT WITH INTENT:** Grid, generous whitespace, mobile-first, vary section structure, cards only for real repeated objects, one icon set.
4. **STATES + PURPOSEFUL MOTION:** Hover/focus/active/disabled/loading/empty/error for everything. Motion = feedback, 100-300ms, transform/opacity only, honor reduced motion.
5. **WORDS, A11Y, POLISH:** Specific human copy, semantic HTML, keyboard + contrast, pixel-level finishing pass, and run the Anti-Slop list.

**Final instruction to the agent:** *Restraint is the signature of modern design. Choose less, execute it precisely, make one thing memorable, and make every state of every component feel intentional.*
