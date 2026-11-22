# Vignette Bloom — build prompt

Use this document as a self-contained prompt for an AI coding agent. It
describes the 21st.dev “Vignette Bloom” image effect as implemented on this
site, so the effect can be rebuilt in another codebase without access to
21st.dev’s internal source.

---

## Goal

Build a React component that turns a still photograph into a living, full-bleed
mosaic inside a dark plate. The plate should feel like a printed study: a
near-black field, square tiles sampled from the photo, a slow diagonal wave of
light, soft bloom on the highlights, and a heavy vignette. It should run at a
steady 30fps, pause when it leaves the viewport, and respect reduced motion.

Use the exact preset below. Do not “improve” the numbers.

## Reference

- Effect name: **Vignette Bloom** (21st.dev community preset).
- Source photo: a wide 1536×864 dancer on a black background, warm skin tones,
  centered subject, lots of negative space.
- Frame: 4:3 plate, 28px radius, 1px white border at 8% opacity, deep soft
  shadow. The photo is cropped with `object-fit: cover` behavior, keeping the
  center.
- The finished plate reads as a dark mosaic painting, not a pixel-art filter.
  Tiles are flush; there should be no visible grid gaps.

## Exact preset

```json
{
  "renderMode": "mosaic",
  "bgMode": "solid",
  "bgColor": "#08090b",
  "bgBlur": 12,
  "bgOpacity": 90,
  "cellSize": 16,
  "coverage": 100,
  "invert": false,
  "styleBlend": "source-over",
  "charSet": "standard",
  "customChars": "",
  "brightness": 12,
  "contrast": 115,
  "edgeEmphasis": 0,
  "density": 0,
  "toneCurve": [
    { "x": 0, "y": 0 },
    { "x": 1, "y": 1 }
  ],
  "tint": "#3ca6ff",
  "tintOpacity": 0,
  "overlayBlend": "multiply",
  "saturation": 100,
  "grayscale": 0,
  "blurType": "off",
  "blurAmount": 35,
  "blurAngle": 0,
  "directionalBothSides": false,
  "tiltFocus": 35,
  "tiltPosition": 50,
  "tiltFeather": 15,
  "lensFocus": 40,
  "blurCenterX": 50,
  "blurCenterY": 50,
  "progressivePosition": 55,
  "progressiveReverse": false,
  "pfx": {
    "vignette": { "enabled": true, "intensity": 38 },
    "scanLines": { "enabled": false, "intensity": 40 },
    "chromatic": { "enabled": false, "intensity": 15 },
    "bloom": { "enabled": true, "intensity": 25 },
    "filmGrain": { "enabled": false, "intensity": 30 },
    "glitch": { "enabled": false, "intensity": 20 },
    "pixelate": { "enabled": false, "intensity": 15 },
    "halftone": { "enabled": false, "intensity": 20 },
    "filmDust": { "enabled": false, "intensity": 20 }
  },
  "animated": true,
  "animStyle": "wave",
  "animSpeed": { "enabled": true, "intensity": 100 },
  "animIntensity": { "enabled": true, "intensity": 60 },
  "lights": { "enabled": false, "points": [] },
  "mask": {
    "enabled": false,
    "tool": "freehand",
    "brushSize": 30,
    "showOverlay": false,
    "invert": false,
    "dataUrl": null,
    "shapes": []
  }
}
```

`bgColor` is an addition for this implementation: the original preset selects a
solid background but does not carry the color, so the plate uses `#08090b`.

## What the preset means

- **Mosaic, 16px cells.** One flat square per sample. The whole image is
  quantized to a grid, not blurred.
- **Brightness +12%, contrast 115%.** The darks stay dark; skin and fabric pick
  up a little more separation.
- **No tint, no saturation change, no grayscale.** Keep the photograph’s color.
- **Wave animation, speed 100, intensity 60.** A diagonal luminance wave moves
  through the mosaic. It should be slow enough to read as breathing, not
  flickering.
- **Bloom 25.** Only highlights bloom. The effect should be visible on the
  dancer’s lit edges, not as a global haze.
- **Vignette 38.** The corners fall off hard, framing the subject.
- **Solid background `#08090b`.** No photo background, no blur.

## Render pipeline

1. **Load the image.** Use `new Image()`, `decoding = "async"`, and wait for
   `onload`. If the source is remote, set `crossOrigin = "anonymous"` before
   `src` so the canvas stays readable.
2. **Size the canvas.** Read the host’s CSS box. Backing-store scale is
   `min(devicePixelRatio, 2)`, further capped so the render width never exceeds
   1500px. Set `canvas.width` and `canvas.height` in device pixels.
3. **Choose the grid.** `cellSize = 16 * scale`, then
   `cols = ceil(width / cellSize)` and `rows = ceil(height / cellSize)`.
4. **Sample once.** Draw the image into an offscreen `cols × rows` canvas with
   high-quality smoothing and cover-crop math. Read the pixels once with
   `getImageData`. Never call `getImageData` inside the animation loop.
5. **Build cells.** For each sample, compute the adjusted RGB and luminance,
   an edge value from the right and bottom neighbors, a deterministic coverage
   hash, and the inset from `density`. Store the cells in a flat array.
6. **Prepare buffers.** Create the bloom canvas (`cols × rows`), a scratch
   canvas at full size, a mask canvas at full size, a 128×128 noise canvas, and
   the vignette gradient. Do this on resize, not every frame.
7. **Draw.** Each frame: clear, paint the background, draw the cells with the
   animated luminance modulation, apply bloom, optional post effects, the
   vignette, lights and mask. Restore the context at the end.
8. **Schedule.** Cap at 30fps (`1000 / 30`). Pause when the host is outside the
   viewport (`IntersectionObserver`, `rootMargin: 160px`), when the document is
   hidden, or when the user pauses. Resume without a time jump.

## Color math

Work in normalized 0–1 RGB, in this order:

```
brightness = 1 + brightness / 100
rgb *= brightness

contrast = contrast / 100
rgb = (rgb - 0.5) * contrast + 0.5

lum = 0.2126r + 0.7152g + 0.0722b

saturation = saturation / 100
rgb = lum + (rgb - lum) * saturation

grayscale = grayscale / 100
rgb = rgb * (1 - grayscale) + lum * grayscale

mapped = toneCurve(lum)
if lum > 0.0001: rgb *= mapped / lum

if invert: rgb = 1 - rgb

if edgeEmphasis > 0:
  rgb += edge * (edgeEmphasis / 100) * 0.8

if tintOpacity > 0:
  blend rgb toward tint using overlayBlend, then mix by tintOpacity

clamp rgb to 0–1
```

The tone curve is a piecewise-linear lookup over the sorted `{x, y}` points,
clamped at both ends. With the preset it is the identity.

The edge value is:

```
edge = min(1, (abs(lum - right) + abs(lum - bottom)) * 2.2)
```

## Animation

Wave is a diagonal sine. For a cell at `(col, row)`:

```
nx = cols > 1 ? col / (cols - 1) : 0.5
ny = rows > 1 ? row / (rows - 1) : 0.5

speed = 0.35 + (animSpeed.intensity / 100) * 1.4
amplitude = animIntensity.intensity / 100

wave = sin((nx + ny) * PI * 2.2 - time * speed * 1.9) * amplitude
```

Apply `modulation = 1 + wave * 0.22` to each cell’s RGB before drawing. With
intensity 60 that is roughly ±13% luminance, which is enough to see and not
enough to strobe.

The other animation styles are:

- `pulse`: `sin(time * speed * 1.7) * amplitude`
- `shimmer`: `sin(nx * 11 + ny * 7 + time * speed * 5) * amplitude`
- `ripple`: radial sine from the center, `24` cycles, `time * speed * 2.4`
- `flicker`: deterministic hash from `col`, `row`, `time`, mapped to ±amplitude

## Bloom

1. Clear the bloom canvas.
2. For every cell with modulated luminance above `0.36`, fill one pixel at
   `(col, row)` with the cell color. Alpha ramps from 0 at 0.36 to 1 at 1.
3. Composite the bloom canvas back with `globalCompositeOperation = "screen"`.
   Draw once blurred by about `cellSize * 1.6` at `0.5 * strength`, then once
   slightly larger and offset at `0.22 * strength`.
4. `strength = pfx.bloom.intensity / 100` (0.25 with the preset).

## Vignette

Build a radial gradient centered on the canvas:

- inner radius: `min(width, height) * 0.24`
- outer radius: `hypot(width, height) * 0.56`
- stops: `rgba(0,0,0,0)` at 0, `rgba(0,0,0,0.08 * strength)` at 0.6,
  `rgba(0,0,0,0.78 * strength)` at 1
- `strength = pfx.vignette.intensity / 100` (0.38 with the preset)

Fill the whole canvas with it after bloom.

## Other render modes

The component contract supports `characters`, `dots`, `rings`, `diamond`,
`cross`, `triangles`, `lines`, `diagonal`, `halfblocks`, `dither` and
`mosaic`/`pixel`. Tune `mosaic`; the rest can share the same sampling and color
pipeline with a different primitive. Unknown modes fall back to mosaic.

## Performance rules

- Cap DPR at 2 and render width at 1500px.
- Sample at cell resolution, not full resolution.
- Reuse the bloom, scratch and mask canvases across frames.
- Do not allocate DOM nodes or canvases inside the animation loop.
- Do not read pixels per frame.
- Stop the RAF loop when offscreen or hidden.
- Rebuild only when the host box changes.

## Accessibility

- The `<canvas>` gets `role="img"` and a descriptive `aria-label`.
- Keep a real `<img>` fallback underneath, hidden from assistive tech. Fade it
  out only after the first canvas frame.
- Provide a 40–44px pause/play control with a text `aria-label`.
- If `prefers-reduced-motion: reduce`, start paused on a static frame. The
  control lets the user opt in to motion.
- Never put essential copy only inside the canvas.

## Acceptance criteria

- At 375px and 1440px wide, the plate fills its column with no overflow.
- The mosaic shows distinct 16px squares at DPR 1 and stays crisp at DPR 2.
- The wave is visible but calm; no cell flickers randomly.
- Bloom appears on the lit skin and fabric, not across the black background.
- Corners are visibly darker; the subject stays readable.
- Pause stops the animation and the button label flips to “Play animation”.
- Scrolling the plate out of view stops the loop; scrolling back resumes.
- Reduced motion produces a static, correctly colored first frame.
- The component uses the preset above without modification.

## Integration on this site

- Preset and types: `lib/vignette-bloom.ts`.
- Renderer: `components/vignette-bloom.tsx`.
- Usage:

```tsx
import { VignetteBloom } from "@/components/vignette-bloom";
import { vignetteBloomPreset } from "@/lib/vignette-bloom";

<VignetteBloom
  src="/img/ascii-portrait.webp"
  alt="A dancer rendered as a living mosaic of light and shadow."
  config={vignetteBloomPreset}
/>
```
