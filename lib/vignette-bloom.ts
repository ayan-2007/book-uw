export type RenderMode =
  | "characters"
  | "dither"
  | "mosaic"
  | "pixel"
  | "dots"
  | "cross"
  | "diamond"
  | "voxel"
  | "lego"
  | "mixed"
  | "lines"
  | "diagonal"
  | "braille"
  | "disco"
  | "hexdump"
  | "matrix"
  | "rings"
  | "hearts"
  | "stars"
  | "hexagons"
  | "triangles"
  | "bubbles"
  | "hatch"
  | "contour"
  | "halfblocks";

export type BackgroundMode = "blurred" | "solid" | "photo" | "none";

export type AnimationStyle = "wave" | "pulse" | "shimmer" | "ripple" | "flicker";

export type OverlayBlend = "multiply" | "screen" | "overlay";

export type BlurType =
  | "off"
  | "gaussian"
  | "directional"
  | "tilt"
  | "lens"
  | "progressive";

export type PostEffectKey =
  | "scanLines"
  | "vignette"
  | "bloom"
  | "chromatic"
  | "filmGrain"
  | "glitch"
  | "halftone"
  | "pixelate"
  | "filmDust";

export type PostEffectSetting = {
  enabled: boolean;
  /** 0–100 */
  intensity: number;
};

export type LightPoint = {
  /** Normalised 0–1 */
  x: number;
  /** Normalised 0–1 */
  y: number;
  /** Fraction of the short edge (0–1) or a percentage (1–100). */
  radius: number;
  /** 0–100 */
  intensity: number;
  color?: string;
};

export type TonePoint = {
  x: number;
  y: number;
};

export type MaskShape = {
  id?: string;
  [key: string]: unknown;
};

export type VignetteBloomConfig = {
  renderMode: RenderMode;
  bgMode: BackgroundMode;
  /** Added for the current system: the colour used by the solid background mode. */
  bgColor: string;
  bgBlur: number;
  bgOpacity: number;
  cellSize: number;
  coverage: number;
  invert: boolean;
  styleBlend: GlobalCompositeOperation;
  charSet: string;
  customChars: string;
  brightness: number;
  contrast: number;
  edgeEmphasis: number;
  density: number;
  toneCurve: TonePoint[];
  tint: string;
  tintOpacity: number;
  overlayBlend: OverlayBlend;
  saturation: number;
  grayscale: number;
  blurType: BlurType;
  blurAmount: number;
  blurAngle: number;
  directionalBothSides: boolean;
  tiltFocus: number;
  tiltPosition: number;
  tiltFeather: number;
  lensFocus: number;
  blurCenterX: number;
  blurCenterY: number;
  progressivePosition: number;
  progressiveReverse: boolean;
  pfx: Record<PostEffectKey, PostEffectSetting>;
  animated: boolean;
  animStyle: AnimationStyle;
  animSpeed: {
    enabled: boolean;
    /** 0–100 */
    intensity: number;
  };
  animIntensity: {
    enabled: boolean;
    /** 0–100 */
    intensity: number;
  };
  lights: {
    enabled: boolean;
    points: LightPoint[];
  };
  mask: {
    enabled: boolean;
    tool: "freehand" | "brush" | "shape";
    brushSize: number;
    showOverlay: boolean;
    invert: boolean;
    dataUrl: string | null;
    shapes: MaskShape[];
  };
};

/**
 * The “Vignette Bloom” recipe used on the 21st.dev community page.
 * The renderer on this site is scoped to the mosaic primitive; the rest of
 * the contract is kept so the preset can be swapped without changing the
 * component API.
 */
export const vignetteBloomPreset: VignetteBloomConfig = {
  renderMode: "mosaic",
  bgMode: "solid",
  bgColor: "#08090b",
  bgBlur: 12,
  bgOpacity: 90,
  cellSize: 16,
  coverage: 100,
  invert: false,
  styleBlend: "source-over",
  charSet: "standard",
  customChars: "",
  brightness: 12,
  contrast: 115,
  edgeEmphasis: 0,
  density: 0,
  toneCurve: [
    { x: 0, y: 0 },
    { x: 1, y: 1 },
  ],
  tint: "#3ca6ff",
  tintOpacity: 0,
  overlayBlend: "multiply",
  saturation: 100,
  grayscale: 0,
  blurType: "off",
  blurAmount: 35,
  blurAngle: 0,
  directionalBothSides: false,
  tiltFocus: 35,
  tiltPosition: 50,
  tiltFeather: 15,
  lensFocus: 40,
  blurCenterX: 50,
  blurCenterY: 50,
  progressivePosition: 55,
  progressiveReverse: false,
  pfx: {
    vignette: { enabled: true, intensity: 38 },
    scanLines: { enabled: false, intensity: 40 },
    chromatic: { enabled: false, intensity: 15 },
    bloom: { enabled: true, intensity: 25 },
    filmGrain: { enabled: false, intensity: 30 },
    glitch: { enabled: false, intensity: 20 },
    pixelate: { enabled: false, intensity: 15 },
    halftone: { enabled: false, intensity: 20 },
    filmDust: { enabled: false, intensity: 20 },
  },
  animated: true,
  animStyle: "wave",
  animSpeed: { enabled: true, intensity: 100 },
  animIntensity: { enabled: true, intensity: 60 },
  lights: { enabled: false, points: [] },
  mask: {
    enabled: false,
    tool: "freehand",
    brushSize: 30,
    showOverlay: false,
    invert: false,
    dataUrl: null,
    shapes: [],
  },
};
