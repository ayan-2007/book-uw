"use client";

import { useEffect, useRef, useState } from "react";
import type { VignetteBloomConfig } from "@/lib/vignette-bloom";

type VignetteBloomProps = {
  src: string;
  alt: string;
  config: VignetteBloomConfig;
  className?: string;
};

type Cell = {
  col: number;
  row: number;
  r: number;
  g: number;
  b: number;
  lum: number;
  inset: number;
  draw: boolean;
};

const TAU = Math.PI * 2;
const FRAME_MS = 1000 / 30;
const MAX_RENDER_WIDTH = 1500;

function clamp01(value: number) {
  return value < 0 ? 0 : value > 1 ? 1 : value;
}

function clamp255(value: number) {
  return value < 0 ? 0 : value > 255 ? 255 : value;
}

function fract(value: number) {
  return value - Math.floor(value);
}

function hexToRgb(hex: string): [number, number, number] {
  const value = hex.replace("#", "");
  if (value.length === 3) {
    return [
      parseInt(value[0] + value[0], 16) / 255,
      parseInt(value[1] + value[1], 16) / 255,
      parseInt(value[2] + value[2], 16) / 255,
    ];
  }
  if (value.length === 6) {
    return [
      parseInt(value.slice(0, 2), 16) / 255,
      parseInt(value.slice(2, 4), 16) / 255,
      parseInt(value.slice(4, 6), 16) / 255,
    ];
  }
  return [1, 1, 1];
}

function evaluateCurve(
  curve: { x: number; y: number }[],
  value: number,
): number {
  if (curve.length < 2) return value;
  const sorted = [...curve].sort((a, b) => a.x - b.x);
  const x = clamp01(value);
  if (x <= sorted[0].x) return clamp01(sorted[0].y);
  for (let i = 1; i < sorted.length; i += 1) {
    const previous = sorted[i - 1];
    const current = sorted[i];
    if (x <= current.x) {
      const span = current.x - previous.x || 1;
      const t = (x - previous.x) / span;
      return clamp01(previous.y + (current.y - previous.y) * t);
    }
  }
  return clamp01(sorted[sorted.length - 1].y);
}

function adjustColor(
  red: number,
  green: number,
  blue: number,
  edge: number,
  config: VignetteBloomConfig,
): [number, number, number, number] {
  let r = red / 255;
  let g = green / 255;
  let b = blue / 255;

  const brightness = 1 + config.brightness / 100;
  r *= brightness;
  g *= brightness;
  b *= brightness;

  const contrast = config.contrast / 100;
  r = (r - 0.5) * contrast + 0.5;
  g = (g - 0.5) * contrast + 0.5;
  b = (b - 0.5) * contrast + 0.5;

  let lum = 0.2126 * r + 0.7152 * g + 0.0722 * b;

  const saturation = config.saturation / 100;
  r = lum + (r - lum) * saturation;
  g = lum + (g - lum) * saturation;
  b = lum + (b - lum) * saturation;

  const grayscale = config.grayscale / 100;
  r = r * (1 - grayscale) + lum * grayscale;
  g = g * (1 - grayscale) + lum * grayscale;
  b = b * (1 - grayscale) + lum * grayscale;

  const mapped = evaluateCurve(config.toneCurve, clamp01(lum));
  if (lum > 0.0001) {
    const scale = mapped / lum;
    r *= scale;
    g *= scale;
    b *= scale;
  }

  if (config.invert) {
    r = 1 - r;
    g = 1 - g;
    b = 1 - b;
  }

  if (config.edgeEmphasis > 0) {
    const boost = edge * (config.edgeEmphasis / 100) * 0.8;
    r += boost;
    g += boost;
    b += boost;
  }

  const tintOpacity = clamp01(config.tintOpacity / 100);
  if (tintOpacity > 0) {
    const [tr, tg, tb] = hexToRgb(config.tint);
    let mixR = tr;
    let mixG = tg;
    let mixB = tb;

    if (config.overlayBlend === "multiply") {
      mixR = r * tr;
      mixG = g * tg;
      mixB = b * tb;
    } else if (config.overlayBlend === "screen") {
      mixR = 1 - (1 - r) * (1 - tr);
      mixG = 1 - (1 - g) * (1 - tg);
      mixB = 1 - (1 - b) * (1 - tb);
    } else {
      mixR = r < 0.5 ? 2 * r * tr : 1 - 2 * (1 - r) * (1 - tr);
      mixG = g < 0.5 ? 2 * g * tg : 1 - 2 * (1 - g) * (1 - tg);
      mixB = b < 0.5 ? 2 * b * tb : 1 - 2 * (1 - b) * (1 - tb);
    }

    r = r * (1 - tintOpacity) + mixR * tintOpacity;
    g = g * (1 - tintOpacity) + mixG * tintOpacity;
    b = b * (1 - tintOpacity) + mixB * tintOpacity;
  }

  r = clamp01(r);
  g = clamp01(g);
  b = clamp01(b);
  lum = 0.2126 * r + 0.7152 * g + 0.0722 * b;

  return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255), lum];
}

function animationValue(
  config: VignetteBloomConfig,
  time: number,
  col: number,
  row: number,
  cols: number,
  rows: number,
): number {
  if (!config.animated) return 0;

  const speed = config.animSpeed.enabled
    ? 0.35 + (config.animSpeed.intensity / 100) * 1.4
    : 0.7;
  const amplitude = config.animIntensity.enabled
    ? config.animIntensity.intensity / 100
    : 0.25;

  if (amplitude === 0) return 0;

  const nx = cols > 1 ? col / (cols - 1) : 0.5;
  const ny = rows > 1 ? row / (rows - 1) : 0.5;

  switch (config.animStyle) {
    case "pulse":
      return Math.sin(time * speed * 1.7) * amplitude;
    case "shimmer":
      return Math.sin(nx * 11 + ny * 7 + time * speed * 5) * amplitude;
    case "ripple": {
      const dx = nx - 0.5;
      const dy = ny - 0.5;
      return (
        Math.sin(Math.sqrt(dx * dx + dy * dy) * 24 - time * speed * 2.4) *
        amplitude
      );
    }
    case "flicker": {
      const value =
        Math.sin(col * 12.9898 + row * 78.233 + time * speed * 9) * 43758.5453;
      return (fract(value) - 0.5) * 2 * amplitude;
    }
    case "wave":
    default:
      return (
        Math.sin((nx + ny) * Math.PI * 2.2 - time * speed * 1.9) * amplitude
      );
  }
}

function charSetFor(config: VignetteBloomConfig) {
  if (config.customChars.trim()) return config.customChars;
  switch (config.charSet) {
    case "blocks":
      return "░▒▓█";
    case "dots":
      return "·•●";
    case "minimal":
      return " .-+*";
    case "standard":
    default:
      return " .:-=+*#%@";
  }
}

function drawCover(
  context: CanvasRenderingContext2D,
  image: HTMLImageElement,
  x: number,
  y: number,
  width: number,
  height: number,
) {
  const imageWidth = image.naturalWidth;
  const imageHeight = image.naturalHeight;
  if (!imageWidth || !imageHeight) return;

  const sourceAspect = imageWidth / imageHeight;
  const targetAspect = width / height;
  let sx = 0;
  let sy = 0;
  let sw = imageWidth;
  let sh = imageHeight;

  if (sourceAspect > targetAspect) {
    sw = imageHeight * targetAspect;
    sx = (imageWidth - sw) / 2;
  } else {
    sh = imageWidth / targetAspect;
    sy = (imageHeight - sh) / 2;
  }

  context.drawImage(image, sx, sy, sw, sh, x, y, width, height);
}

function drawCell(
  context: CanvasRenderingContext2D,
  cell: Cell,
  red: number,
  green: number,
  blue: number,
  cellSize: number,
  config: VignetteBloomConfig,
) {
  const x = cell.col * cellSize;
  const y = cell.row * cellSize;
  const pad = cell.inset;
  const size = Math.max(1, cellSize - pad * 2);
  const fill = `rgb(${red | 0},${green | 0},${blue | 0})`;

  context.fillStyle = fill;

  switch (config.renderMode) {
    case "characters": {
      const chars = charSetFor(config);
      const index = Math.min(
        chars.length - 1,
        Math.max(0, Math.floor(cell.lum * chars.length)),
      );
      context.font = `600 ${Math.max(7, cellSize * 1.05)}px "General Sans", system-ui, sans-serif`;
      context.textAlign = "center";
      context.textBaseline = "middle";
      context.fillText(chars[index], x + cellSize / 2, y + cellSize / 2);
      break;
    }
    case "dots": {
      const radius = (size / 2) * (0.28 + cell.lum * 0.72);
      context.beginPath();
      context.arc(x + cellSize / 2, y + cellSize / 2, Math.max(0.5, radius), 0, TAU);
      context.fill();
      break;
    }
    case "rings": {
      context.lineWidth = Math.max(1, cellSize * 0.12);
      context.strokeStyle = fill;
      context.beginPath();
      context.arc(
        x + cellSize / 2,
        y + cellSize / 2,
        Math.max(1, (size / 2) * (0.3 + cell.lum * 0.7)),
        0,
        TAU,
      );
      context.stroke();
      break;
    }
    case "diamond": {
      const half = size / 2;
      context.beginPath();
      context.moveTo(x + cellSize / 2, y + pad);
      context.lineTo(x + cellSize - pad, y + cellSize / 2);
      context.lineTo(x + cellSize / 2, y + cellSize - pad);
      context.lineTo(x + pad, y + cellSize / 2);
      context.closePath();
      context.fill();
      break;
    }
    case "cross": {
      const thickness = Math.max(1, size * 0.28);
      context.fillRect(
        x + cellSize / 2 - thickness / 2,
        y + pad,
        thickness,
        size,
      );
      context.fillRect(
        x + pad,
        y + cellSize / 2 - thickness / 2,
        size,
        thickness,
      );
      break;
    }
    case "triangles": {
      context.beginPath();
      context.moveTo(x + cellSize / 2, y + pad);
      context.lineTo(x + cellSize - pad, y + cellSize - pad);
      context.lineTo(x + pad, y + cellSize - pad);
      context.closePath();
      context.fill();
      break;
    }
    case "lines": {
      const height = Math.max(1, size * (0.12 + cell.lum * 0.28));
      context.fillRect(x + pad, y + cellSize / 2 - height / 2, size, height);
      break;
    }
    case "diagonal": {
      context.lineWidth = Math.max(1, size * 0.2);
      context.strokeStyle = fill;
      context.beginPath();
      context.moveTo(x + pad, y + cellSize - pad);
      context.lineTo(x + cellSize - pad, y + pad);
      context.stroke();
      break;
    }
    case "halfblocks": {
      context.fillRect(x + pad, y + pad, size, size * 0.48);
      context.globalAlpha = 0.72;
      context.fillRect(
        x + pad,
        y + pad + size * 0.52,
        size,
        size * 0.48,
      );
      context.globalAlpha = 1;
      break;
    }
    case "dither": {
      const threshold = cell.lum * 4;
      const half = size / 2;
      context.fillStyle = fill;
      for (let row = 0; row < 2; row += 1) {
        for (let col = 0; col < 2; col += 1) {
          const index = row * 2 + col;
          if (index < threshold) {
            context.fillRect(
              x + pad + col * half,
              y + pad + row * half,
              half + 0.35,
              half + 0.35,
            );
          }
        }
      }
      break;
    }
    case "mosaic":
    case "pixel":
    default:
      context.fillRect(x + pad, y + pad, size + 0.35, size + 0.35);
      break;
  }
}

export function VignetteBloom({
  src,
  alt,
  config,
  className = "",
}: VignetteBloomProps) {
  const hostRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const timeRef = useRef(0);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);
  const [reduced, setReduced] = useState(false);
  const [playing, setPlaying] = useState(true);
  const [userToggled, setUserToggled] = useState(false);

  const animate =
    config.animated && playing && (!reduced || userToggled);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(query.matches);
    update();
    query.addEventListener?.("change", update);
    return () => query.removeEventListener?.("change", update);
  }, []);

  useEffect(() => {
    const host = hostRef.current;
    const canvas = canvasRef.current;
    if (!host || !canvas) return;

    const context = canvas.getContext("2d", { alpha: true });
    if (!context) return;

    let disposed = false;
    let raf = 0;
    let last = 0;
    let resizeRaf = 0;
    let inView = true;
    let image: HTMLImageElement | null = null;
    let maskImage: HTMLImageElement | null = null;
    let cells: Cell[] = [];
    let cols = 0;
    let rows = 0;
    let cellSize = 16;
    let scale = 1;
    let width = 0;
    let height = 0;
    let lastWidth = 0;
    let lastHeight = 0;
    let hasReady = false;
    let vignette: CanvasGradient | null = null;
    let bloomCanvas: HTMLCanvasElement | null = null;
    let bloomContext: CanvasRenderingContext2D | null = null;
    let noiseCanvas: HTMLCanvasElement | null = null;
    let scratchCanvas: HTMLCanvasElement | null = null;
    let scratchContext: CanvasRenderingContext2D | null = null;
    let maskCanvas: HTMLCanvasElement | null = null;
    let maskContext: CanvasRenderingContext2D | null = null;
    const supportsFilter = typeof context.filter === "string";

    const start = performance.now() - timeRef.current * 1000;

    const stop = () => {
      if (raf) {
        cancelAnimationFrame(raf);
        raf = 0;
      }
    };

    const draw = (time: number) => {
      if (!context || !width || !height) return;

      context.save();
      context.setTransform(1, 0, 0, 1, 0, 0);
      context.globalCompositeOperation = "source-over";
      context.globalAlpha = 1;
      context.clearRect(0, 0, width, height);

      if (config.bgMode === "solid") {
        context.globalAlpha = clamp01(config.bgOpacity / 100);
        context.fillStyle = config.bgColor;
        context.fillRect(0, 0, width, height);
      } else if (config.bgMode === "photo" && image) {
        context.globalAlpha = clamp01(config.bgOpacity / 100);
        drawCover(context, image, 0, 0, width, height);
      } else if (config.bgMode === "blurred" && image) {
        context.globalAlpha = clamp01(config.bgOpacity / 100);
        if (supportsFilter) {
          context.filter = `blur(${Math.max(0, config.bgBlur) * scale}px)`;
        }
        drawCover(context, image, 0, 0, width, height);
        context.filter = "none";
      }

      context.globalAlpha = 1;
      context.globalCompositeOperation = config.styleBlend;

      for (const cell of cells) {
        if (!cell.draw) continue;
        const wave = animationValue(
          config,
          time,
          cell.col,
          cell.row,
          cols,
          rows,
        );
        const modulation = 1 + wave * 0.22;
        drawCell(
          context,
          cell,
          clamp255(cell.r * modulation),
          clamp255(cell.g * modulation),
          clamp255(cell.b * modulation),
          cellSize,
          config,
        );
      }

      context.globalCompositeOperation = "source-over";

      if (
        config.blurType !== "off" &&
        config.blurAmount > 0 &&
        supportsFilter &&
        scratchCanvas &&
        scratchContext
      ) {
        scratchContext.clearRect(0, 0, width, height);
        scratchContext.drawImage(canvas, 0, 0);
        context.clearRect(0, 0, width, height);
        context.save();
        context.filter = `blur(${config.blurAmount * 0.12 * scale}px)`;
        context.drawImage(scratchCanvas, 0, 0);
        context.restore();
      }

      if (config.pfx.bloom.enabled && bloomCanvas && bloomContext) {
        bloomContext.clearRect(0, 0, cols, rows);
        bloomContext.globalCompositeOperation = "source-over";
        for (const cell of cells) {
          if (!cell.draw) continue;
          const wave = animationValue(
            config,
            time,
            cell.col,
            cell.row,
            cols,
            rows,
          );
          const lum = clamp01(cell.lum * (1 + wave * 0.22));
          if (lum < 0.36) continue;
          bloomContext.globalAlpha = Math.min(1, (lum - 0.36) / 0.64);
          bloomContext.fillStyle = `rgb(${cell.r},${cell.g},${cell.b})`;
          bloomContext.fillRect(cell.col, cell.row, 1, 1);
        }

        const strength = config.pfx.bloom.intensity / 100;
        context.save();
        context.globalCompositeOperation = "screen";
        context.imageSmoothingEnabled = true;
        context.globalAlpha = 0.5 * strength;
        if (supportsFilter) {
          context.filter = `blur(${Math.max(2, cellSize * 1.6)}px)`;
        }
        context.drawImage(bloomCanvas, 0, 0, width, height);
        context.filter = "none";
        context.globalAlpha = 0.22 * strength;
        context.drawImage(
          bloomCanvas,
          -cellSize * 0.5,
          -cellSize * 0.5,
          width + cellSize,
          height + cellSize,
        );
        context.restore();
      }

      if (config.pfx.scanLines.enabled) {
        const spacing = Math.max(2, Math.round(3 * scale));
        context.save();
        context.fillStyle = `rgba(0,0,0,${0.16 * (config.pfx.scanLines.intensity / 100)})`;
        for (let y = 0; y < height; y += spacing) {
          context.fillRect(0, y, width, 1);
        }
        context.restore();
      }

      if (
        config.pfx.chromatic.enabled &&
        scratchCanvas &&
        scratchContext
      ) {
        scratchContext.clearRect(0, 0, width, height);
        scratchContext.drawImage(canvas, 0, 0);
        const offset = Math.max(
          1,
          (config.pfx.chromatic.intensity / 100) * 6 * scale,
        );
        context.save();
        context.globalCompositeOperation = "screen";
        context.globalAlpha = 0.22;
        context.drawImage(scratchCanvas, -offset, 0);
        context.drawImage(scratchCanvas, offset, 0);
        context.restore();
      }

      if (config.pfx.filmGrain.enabled && noiseCanvas) {
        const pattern = context.createPattern(noiseCanvas, "repeat");
        if (pattern) {
          context.save();
          context.globalAlpha = 0.08 * (config.pfx.filmGrain.intensity / 100);
          context.fillStyle = pattern;
          context.translate(
            Math.random() * 128 - 64,
            Math.random() * 128 - 64,
          );
          context.fillRect(-128, -128, width + 256, height + 256);
          context.restore();
        }
      }

      if (config.pfx.glitch.enabled && Math.random() < 0.14) {
        const slices = 3;
        for (let index = 0; index < slices; index += 1) {
          const sliceY = Math.random() * height;
          const sliceHeight = Math.random() * 20 * scale;
          const shift =
            (Math.random() - 0.5) *
            (config.pfx.glitch.intensity / 100) *
            18 *
            scale;
          context.drawImage(
            canvas,
            0,
            sliceY,
            width,
            sliceHeight,
            shift,
            sliceY,
            width,
            sliceHeight,
          );
        }
      }

      if (config.pfx.halftone.enabled) {
        const step = Math.max(4, 7 * scale);
        context.save();
        context.globalAlpha = 0.14 * (config.pfx.halftone.intensity / 100);
        context.fillStyle = "#000";
        for (let y = step / 2; y < height; y += step) {
          for (let x = step / 2; x < width; x += step) {
            context.beginPath();
            context.arc(x, y, step * 0.18, 0, TAU);
            context.fill();
          }
        }
        context.restore();
      }

      if (config.pfx.pixelate.enabled) {
        const factor = Math.max(
          2,
          Math.round(2 + (config.pfx.pixelate.intensity / 100) * 14),
        );
        const small = document.createElement("canvas");
        small.width = Math.max(1, Math.floor(width / factor));
        small.height = Math.max(1, Math.floor(height / factor));
        const smallContext = small.getContext("2d");
        if (smallContext) {
          smallContext.drawImage(canvas, 0, 0, small.width, small.height);
          context.save();
          context.imageSmoothingEnabled = false;
          context.drawImage(small, 0, 0, width, height);
          context.restore();
        }
      }

      if (config.pfx.filmDust.enabled) {
        const count = Math.round(
          (config.pfx.filmDust.intensity / 100) * 40,
        );
        context.save();
        for (let index = 0; index < count; index += 1) {
          const x = Math.random() * width;
          const y = Math.random() * height;
          const size = Math.random() * 2.4 * scale + 0.6;
          context.fillStyle =
            Math.random() > 0.5
              ? "rgba(255,255,255,0.35)"
              : "rgba(0,0,0,0.3)";
          context.fillRect(x, y, size, size);
        }
        context.restore();
      }

      if (config.pfx.vignette.enabled && vignette) {
        context.fillStyle = vignette;
        context.fillRect(0, 0, width, height);
      }

      if (config.lights.enabled && config.lights.points.length > 0) {
        context.save();
        context.globalCompositeOperation = "screen";
        for (const point of config.lights.points) {
          const cx = clamp01(point.x) * width;
          const cy = clamp01(point.y) * height;
          const radiusValue =
            point.radius <= 1 ? point.radius : point.radius / 100;
          const radius = Math.max(
            1,
            radiusValue * Math.min(width, height) * 1.5,
          );
          const [lr, lg, lb] = hexToRgb(point.color || "#8fc4ff");
          const strength = clamp01(point.intensity / 100);
          const gradient = context.createRadialGradient(
            cx,
            cy,
            0,
            cx,
            cy,
            radius,
          );
          gradient.addColorStop(
            0,
            `rgba(${Math.round(lr * 255)},${Math.round(lg * 255)},${Math.round(
              lb * 255,
            )},${0.55 * strength})`,
          );
          gradient.addColorStop(1, "rgba(0,0,0,0)");
          context.fillStyle = gradient;
          context.fillRect(cx - radius, cy - radius, radius * 2, radius * 2);
        }
        context.restore();
      }

      if (
        config.mask.enabled &&
        maskImage &&
        maskCanvas &&
        maskContext &&
        image
      ) {
        maskContext.clearRect(0, 0, width, height);
        drawCover(maskContext, image, 0, 0, width, height);
        maskContext.globalCompositeOperation = config.mask.invert
          ? "destination-out"
          : "destination-in";
        maskContext.drawImage(maskImage, 0, 0, width, height);
        maskContext.globalCompositeOperation = "source-over";
        context.drawImage(maskCanvas, 0, 0);
      }

      context.restore();
      timeRef.current = time;

      if (!hasReady) {
        hasReady = true;
        setReady(true);
      }
    };

    const frame = (now: number) => {
      raf = 0;
      if (disposed || !animate || !inView) return;
      if (document.visibilityState === "hidden") return;
      if (now - last < FRAME_MS) {
        raf = requestAnimationFrame(frame);
        return;
      }
      last = now;
      draw((now - start) / 1000);
      raf = requestAnimationFrame(frame);
    };

    const kick = () => {
      if (disposed || !animate || !inView) return;
      if (raf) return;
      last = 0;
      raf = requestAnimationFrame(frame);
    };

    const build = () => {
      if (!image || !image.naturalWidth) return;

      const rect = host.getBoundingClientRect();
      const cssWidth = Math.max(1, Math.round(rect.width));
      const cssHeight = Math.max(1, Math.round(rect.height));
      if (
        cssWidth === lastWidth &&
        cssHeight === lastHeight &&
        cells.length > 0
      ) {
        return;
      }

      lastWidth = cssWidth;
      lastHeight = cssHeight;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      scale = Math.min(dpr, MAX_RENDER_WIDTH / cssWidth);
      width = Math.max(1, Math.round(cssWidth * scale));
      height = Math.max(1, Math.round(cssHeight * scale));
      canvas.width = width;
      canvas.height = height;

      cellSize = Math.max(4, config.cellSize * scale);
      cols = Math.ceil(width / cellSize);
      rows = Math.ceil(height / cellSize);

      const sample = document.createElement("canvas");
      sample.width = cols;
      sample.height = rows;
      const sampleContext = sample.getContext("2d", {
        willReadFrequently: true,
      });
      if (!sampleContext) return;

      sampleContext.imageSmoothingEnabled = true;
      sampleContext.imageSmoothingQuality = "high";
      drawCover(sampleContext, image, 0, 0, cols, rows);

      let data: Uint8ClampedArray;
      try {
        data = sampleContext.getImageData(0, 0, cols, rows).data;
      } catch {
        setFailed(true);
        return;
      }

      const rawLum = new Float32Array(cols * rows);
      for (let row = 0; row < rows; row += 1) {
        for (let col = 0; col < cols; col += 1) {
          const index = (row * cols + col) * 4;
          rawLum[row * cols + col] =
            (0.2126 * data[index] +
              0.7152 * data[index + 1] +
              0.0722 * data[index + 2]) /
            255;
        }
      }

      const nextCells: Cell[] = [];
      for (let row = 0; row < rows; row += 1) {
        for (let col = 0; col < cols; col += 1) {
          const index = (row * cols + col) * 4;
          const lum = rawLum[row * cols + col];
          const right =
            col + 1 < cols ? rawLum[row * cols + col + 1] : lum;
          const bottom =
            row + 1 < rows ? rawLum[(row + 1) * cols + col] : lum;
          const edge = Math.min(
            1,
            (Math.abs(lum - right) + Math.abs(lum - bottom)) * 2.2,
          );
          const [r, g, b, adjustedLum] = adjustColor(
            data[index],
            data[index + 1],
            data[index + 2],
            edge,
            config,
          );
          const hash = fract(
            Math.sin(col * 12.9898 + row * 78.233) * 43758.5453,
          );
          const inset =
            config.density > 0
              ? cellSize * (config.density / 100) * 0.32
              : 0;
          nextCells.push({
            col,
            row,
            r,
            g,
            b,
            lum: adjustedLum,
            inset,
            draw: hash * 100 < config.coverage,
          });
        }
      }
      cells = nextCells;

      bloomCanvas = document.createElement("canvas");
      bloomCanvas.width = cols;
      bloomCanvas.height = rows;
      bloomContext = bloomCanvas.getContext("2d");

      scratchCanvas = document.createElement("canvas");
      scratchCanvas.width = width;
      scratchCanvas.height = height;
      scratchContext = scratchCanvas.getContext("2d");

      maskCanvas = document.createElement("canvas");
      maskCanvas.width = width;
      maskCanvas.height = height;
      maskContext = maskCanvas.getContext("2d");

      noiseCanvas = document.createElement("canvas");
      noiseCanvas.width = 128;
      noiseCanvas.height = 128;
      const noiseContext = noiseCanvas.getContext("2d");
      if (noiseContext) {
        const noise = noiseContext.createImageData(128, 128);
        for (let index = 0; index < noise.data.length; index += 4) {
          const value = Math.random() * 255;
          noise.data[index] = value;
          noise.data[index + 1] = value;
          noise.data[index + 2] = value;
          noise.data[index + 3] = 255;
        }
        noiseContext.putImageData(noise, 0, 0);
      }

      const centerX = width / 2;
      const centerY = height / 2;
      const inner = Math.min(width, height) * 0.24;
      const outer = Math.hypot(width, height) * 0.56;
      const strength = config.pfx.vignette.intensity / 100;
      vignette = context.createRadialGradient(
        centerX,
        centerY,
        inner,
        centerX,
        centerY,
        outer,
      );
      vignette.addColorStop(0, "rgba(0,0,0,0)");
      vignette.addColorStop(0.6, `rgba(0,0,0,${0.08 * strength})`);
      vignette.addColorStop(1, `rgba(0,0,0,${0.78 * strength})`);

      draw(timeRef.current);
    };

    const resizeObserver = new ResizeObserver(() => {
      if (resizeRaf) cancelAnimationFrame(resizeRaf);
      resizeRaf = requestAnimationFrame(() => {
        resizeRaf = 0;
        const rect = host.getBoundingClientRect();
        if (
          Math.round(rect.width) === lastWidth &&
          Math.round(rect.height) === lastHeight
        ) {
          return;
        }
        build();
        kick();
      });
    });
    resizeObserver.observe(host);

    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        inView = entry.isIntersecting;
        if (inView) {
          draw(timeRef.current);
          kick();
        } else {
          stop();
        }
      },
      { rootMargin: "160px" },
    );
    intersectionObserver.observe(host);

    const onVisibility = () => {
      if (document.visibilityState === "visible") {
        draw(timeRef.current);
        kick();
      } else {
        stop();
      }
    };
    document.addEventListener("visibilitychange", onVisibility);

    const img = new Image();
    image = img;
    img.decoding = "async";
    img.onload = () => {
      if (disposed) return;
      setFailed(false);
      build();
      kick();
    };
    img.onerror = () => {
      if (!disposed) setFailed(true);
    };
    img.src = src;

    if (config.mask.enabled && config.mask.dataUrl) {
      const mask = new Image();
      mask.onload = () => {
        if (disposed) return;
        maskImage = mask;
        draw(timeRef.current);
      };
      mask.src = config.mask.dataUrl;
    }

    if (config.renderMode === "characters" && document.fonts) {
      document.fonts.ready.then(() => {
        if (!disposed) draw(timeRef.current);
      });
    }

    return () => {
      disposed = true;
      stop();
      if (resizeRaf) cancelAnimationFrame(resizeRaf);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      img.onload = null;
      img.onerror = null;
    };
  }, [src, config, animate]);

  const toggle = () => {
    if (animate) {
      setPlaying(false);
      return;
    }
    setUserToggled(true);
    setPlaying(true);
  };

  return (
    <div
      ref={hostRef}
      className={`bloom ${ready ? "is-ready" : ""} ${className}`.trim()}
    >
      <img
        className="bloom__fallback"
        src={src}
        alt=""
        aria-hidden="true"
        decoding="async"
      />
      <canvas
        ref={canvasRef}
        className="bloom__canvas"
        role="img"
        aria-label={alt}
      />
      {!failed ? (
        <button
          type="button"
          className="bloom__control"
          onClick={toggle}
          aria-label={animate ? "Pause animation" : "Play animation"}
        >
          {animate ? (
            <svg viewBox="0 0 16 16" aria-hidden="true">
              <rect x="3.5" y="2.5" width="3" height="11" rx="1" />
              <rect x="9.5" y="2.5" width="3" height="11" rx="1" />
            </svg>
          ) : (
            <svg viewBox="0 0 16 16" aria-hidden="true">
              <path d="M4 2.8v10.4c0 .5.55.8.97.53l7.2-4.9a.64.64 0 0 0 0-1.06l-7.2-4.9A.64.64 0 0 0 4 2.8Z" />
            </svg>
          )}
        </button>
      ) : null}
    </div>
  );
}
