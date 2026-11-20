/**
 * Generates the placeholder art in /public/img.
 * The app does not need this script at runtime. Replace the JPGs with final
 * photography/artwork whenever they are ready; keep the filenames.
 *
 * Run with: node scripts/generate-placeholder-art.mjs
 */
import { mkdir } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const OUT = path.join(process.cwd(), "public", "img");
const INK = "#08182F";
const MIDNIGHT = "#10294B";
const GOLD = "#D8A84E";
const PAPER = "#F3EEE4";
const SLATE = "#8CA0BC";

const SANS =
  "Segoe UI, Arial, Helvetica, sans-serif";
const SERIF = "Georgia, Times New Roman, serif";

function mulberry32(seed) {
  let a = seed;
  return function random() {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function grain(width, height, seed, count = 800) {
  const random = mulberry32(seed);
  let dots = "";
  for (let i = 0; i < count; i += 1) {
    const x = (random() * width).toFixed(1);
    const y = (random() * height).toFixed(1);
    const r = (0.35 + random() * 1.15).toFixed(2);
    const o = (0.015 + random() * 0.06).toFixed(3);
    const fill = random() > 0.76 ? GOLD : PAPER;
    dots += `<circle cx="${x}" cy="${y}" r="${r}" fill="${fill}" opacity="${o}"/>`;
  }
  return dots;
}

function page(width, height, body, defs = "", seed = 1) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
    <defs>
      <radialGradient id="bg" cx="50%" cy="42%" r="80%">
        <stop offset="0" stop-color="${MIDNIGHT}"/>
        <stop offset="0.58" stop-color="#0B1F39"/>
        <stop offset="1" stop-color="${INK}"/>
      </radialGradient>
      <radialGradient id="goldGlow" cx="50%" cy="50%" r="50%">
        <stop offset="0" stop-color="${GOLD}" stop-opacity=".52"/>
        <stop offset=".34" stop-color="${GOLD}" stop-opacity=".16"/>
        <stop offset="1" stop-color="${GOLD}" stop-opacity="0"/>
      </radialGradient>
      <filter id="blur40" x="-80%" y="-80%" width="260%" height="260%">
        <feGaussianBlur stdDeviation="40"/>
      </filter>
      <filter id="blur14" x="-60%" y="-60%" width="220%" height="220%">
        <feGaussianBlur stdDeviation="14"/>
      </filter>
      ${defs}
    </defs>
    <rect width="${width}" height="${height}" fill="url(#bg)"/>
    ${body}
    <g>${grain(width, height, seed)}</g>
  </svg>`;
}

const BRAIN_LEFT =
  "M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 1.98-3A2.5 2.5 0 0 1 9.5 2Z";
const BRAIN_RIGHT =
  "M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-1.98-3A2.5 2.5 0 0 0 14.5 2Z";

function orbit(cx, cy, r) {
  let ticks = "";
  for (let i = 0; i < 72; i += 1) {
    const a = (i / 72) * Math.PI * 2;
    const inner = r + 8;
    const outer = r + (i % 6 === 0 ? 26 : 15);
    ticks += `<line x1="${(cx + Math.cos(a) * inner).toFixed(1)}" y1="${(cy + Math.sin(a) * inner).toFixed(1)}" x2="${(cx + Math.cos(a) * outer).toFixed(1)}" y2="${(cy + Math.sin(a) * outer).toFixed(1)}" stroke="${SLATE}" stroke-opacity="${i % 6 === 0 ? 0.4 : 0.16}" stroke-width="1"/>`;
  }
  return `
    <circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="${SLATE}" stroke-opacity=".12" stroke-width="1"/>
    <circle cx="${cx}" cy="${cy}" r="${r + 38}" fill="none" stroke="${PAPER}" stroke-opacity=".1" stroke-width="1" stroke-dasharray="1 12"/>
    ${ticks}
  `;
}

function cornerMarks(width, height) {
  const m = 68;
  const l = 32;
  return `<g stroke="${PAPER}" stroke-opacity=".18" stroke-width="1">
    <path d="M${m} ${m + l}V${m}h${l}"/>
    <path d="M${width - m - l} ${m}h${l}v${l}"/>
    <path d="M${m} ${height - m - l}v${l}h${l}"/>
    <path d="M${width - m - l} ${height - m}v${l}h${l}"/>
  </g>`;
}

function accent(type) {
  if (type === "none") {
    return `<g opacity=".5">
      <circle cx="600" cy="790" r="380" fill="url(#goldGlow)" opacity=".5"/>
      <circle cx="600" cy="790" r="8" fill="${GOLD}"/>
      <circle cx="600" cy="790" r="30" fill="none" stroke="${GOLD}" stroke-opacity=".6"/>
    </g>`;
  }

  const config = {
    fear: {
      x: 590,
      y: 910,
      glow: 300,
      opacity: 0.48,
      rings: [44, 96, 150],
    },
    comfort: {
      x: 678,
      y: 795,
      glow: 390,
      opacity: 0.64,
      rings: [48, 108, 172],
    },
    status: {
      x: 690,
      y: 660,
      glow: 470,
      opacity: 0.8,
      rings: [50, 112, 184, 258],
    },
  }[type];

  const rings = config.rings
    .map(
      (r, i) =>
        `<circle cx="${config.x}" cy="${config.y}" r="${r}" fill="none" stroke="${GOLD}" stroke-opacity="${(0.58 - i * 0.1).toFixed(2)}" stroke-width="1.2" stroke-dasharray="${i % 2 === 0 ? "2 9" : "none"}"/>`,
    )
    .join("");

  return `<g>
    <circle cx="${config.x}" cy="${config.y}" r="${config.glow}" fill="url(#goldGlow)" opacity="${config.opacity}"/>
    ${rings}
    <circle cx="${config.x}" cy="${config.y}" r="14" fill="${GOLD}" filter="url(#blur14)" opacity=".9"/>
    <circle cx="${config.x}" cy="${config.y}" r="8" fill="${GOLD}"/>
    <circle cx="${config.x}" cy="${config.y}" r="28" fill="none" stroke="${GOLD}" stroke-width="1.5"/>
    <path d="M${config.x - 218} ${config.y + 98} q136 -170 318 -86" fill="none" stroke="${GOLD}" stroke-opacity=".45" stroke-width="1.2"/>
    <path d="M${config.x - 168} ${config.y + 154} q170 -212 352 -100" fill="none" stroke="${GOLD}" stroke-opacity=".24" stroke-width="1"/>
  </g>`;
}

function brainPlate(type) {
  const width = 1200;
  const height = 1500;

  const defs = `
    <clipPath id="brainClip">
      <path d="${BRAIN_LEFT}"/>
      <path d="${BRAIN_RIGHT}"/>
    </clipPath>
  `;

  let scan = "";
  for (let y = 3; y < 22; y += 0.58) {
    scan += `<line x1="1" y1="${y}" x2="23" y2="${y}" stroke="${PAPER}" stroke-opacity=".09" stroke-width=".05"/>`;
  }

  const body = `
    ${orbit(600, 780, 520)}
    ${cornerMarks(width, height)}

    <circle cx="600" cy="820" r="430" fill="${MIDNIGHT}" opacity=".3"/>

    <g transform="translate(240 430) scale(30)">
      <g clip-path="url(#brainClip)">${scan}</g>
      <path d="${BRAIN_LEFT}" fill="#0B203A" fill-opacity=".9" stroke="${PAPER}" stroke-opacity=".58" stroke-width=".075"/>
      <path d="${BRAIN_RIGHT}" fill="#0B203A" fill-opacity=".9" stroke="${PAPER}" stroke-opacity=".58" stroke-width=".075"/>
      <g fill="none" stroke="${SLATE}" stroke-opacity=".38" stroke-width=".055" stroke-linecap="round">
        <path d="M6.4 7.9c2.2.1 3.6 1.1 4.2 2.7"/>
        <path d="M5.2 11.9c2.3-.2 4.1.7 4.8 2.2"/>
        <path d="M6.1 15.7c1.9-.1 3.1.7 3.7 2"/>
        <path d="M17.6 7.9c-2.2.1-3.6 1.1-4.2 2.7"/>
        <path d="M18.8 11.9c-2.3-.2-4.1.7-4.8 2.2"/>
        <path d="M17.9 15.7c-1.9-.1-3.1.7-3.7 2"/>
        <path d="M9.8 5.1c.6 1.1.6 2.2.2 3.2"/>
        <path d="M14.2 5.1c-.6 1.1-.6 2.2-.2 3.2"/>
      </g>
      <line x1="12" y1="4.6" x2="12" y2="19.4" stroke="${GOLD}" stroke-opacity=".3" stroke-width=".045" stroke-dasharray=".3 .6"/>
      <g fill="${GOLD}" fill-opacity=".65">
        <circle cx="7.8" cy="9.9" r=".18"/>
        <circle cx="16.2" cy="9.9" r=".18"/>
        <circle cx="8.1" cy="14.6" r=".18"/>
        <circle cx="15.9" cy="14.6" r=".18"/>
        <circle cx="12" cy="12" r=".2"/>
      </g>
    </g>

    ${accent(type)}
  `;

  return page(width, height, body, defs, 11 + type.length);
}

function coverInner() {
  return `
    <rect width="1200" height="1500" fill="#0A1E38"/>
    <rect x="46" y="46" width="1108" height="1408" fill="none" stroke="${GOLD}" stroke-opacity=".48" stroke-width="2"/>
    <rect x="64" y="64" width="1072" height="1372" fill="none" stroke="${GOLD}" stroke-opacity=".15" stroke-width="1"/>

    <g font-family="${SANS}" fill="${SLATE}">
      <text x="120" y="168" font-size="27">Farhan Khawaja, PhD</text>
      <text x="120" y="203" font-size="21" fill-opacity=".72">Neuroscientist</text>
    </g>

    <line x1="120" y1="254" x2="280" y2="254" stroke="${GOLD}" stroke-width="2"/>

    <g font-family="${SERIF}" fill="${PAPER}">
      <text x="116" y="430" font-size="148">The</text>
      <text x="116" y="575" font-size="148">Limitless</text>
      <text x="116" y="720" font-size="148" fill="${GOLD}">Black Book</text>
    </g>

    <g font-family="${SANS}" fill="${SLATE}">
      <text x="120" y="798" font-size="29">A 21-day protocol for fear,</text>
      <text x="120" y="838" font-size="29">comfort and status.</text>
    </g>

    <g transform="translate(454 1010) scale(12.2)" opacity=".9">
      <path d="${BRAIN_LEFT}" fill="none" stroke="${GOLD}" stroke-opacity=".75" stroke-width=".075"/>
      <path d="${BRAIN_RIGHT}" fill="none" stroke="${GOLD}" stroke-opacity=".75" stroke-width=".075"/>
      <circle cx="12" cy="12" r=".9" fill="${GOLD}"/>
    </g>

    <line x1="120" y1="1340" x2="1080" y2="1340" stroke="${PAPER}" stroke-opacity=".14"/>
    <text x="120" y="1395" font-family="${SANS}" font-size="21" fill="${SLATE}">The Limitless Black Book</text>
    <text x="1080" y="1395" font-family="${SANS}" font-size="21" fill="${SLATE}" text-anchor="end">Hardcover</text>
  `;
}

function coverPage() {
  return page(1200, 1500, coverInner(), "", 404);
}

function hardcoverPage() {
  const width = 1200;
  const height = 1500;
  const body = `
    <circle cx="600" cy="670" r="500" fill="${MIDNIGHT}" opacity=".22"/>
    <ellipse cx="600" cy="1280" rx="380" ry="44" fill="${INK}" opacity=".7"/>
    <g transform="rotate(-4 600 760)">
      <rect x="270" y="354" width="660" height="820" fill="#07152A"/>
      <rect x="922" y="366" width="30" height="796" fill="${PAPER}" opacity=".22"/>
      <g stroke="${PAPER}" stroke-opacity=".18">
        <line x1="922" y1="386" x2="952" y2="386"/>
        <line x1="922" y1="404" x2="952" y2="404"/>
        <line x1="922" y1="422" x2="952" y2="422"/>
        <line x1="922" y1="1122" x2="952" y2="1122"/>
        <line x1="922" y1="1140" x2="952" y2="1140"/>
      </g>
      <rect x="244" y="342" width="52" height="844" fill="#061226"/>
      <line x1="258" y1="380" x2="258" y2="1148" stroke="${GOLD}" stroke-opacity=".4"/>
      <text x="270" y="790" transform="rotate(-90 270 790)" font-family="${SERIF}" font-size="22" fill="${SLATE}" text-anchor="middle">The Limitless Black Book</text>
      <g transform="translate(296 342) scale(.53)">
        ${coverInner()}
      </g>
      <rect x="270" y="342" width="660" height="844" fill="none" stroke="${PAPER}" stroke-opacity=".13"/>
    </g>
    <g font-family="${SANS}" fill="${SLATE}" opacity=".7">
      <text x="600" y="1392" font-size="19" text-anchor="middle">Hardcover edition</text>
    </g>
  `;
  return page(width, height, body, "", 909);
}

function keyPage() {
  const width = 1200;
  const height = 900;
  const body = `
    <circle cx="600" cy="440" r="330" fill="none" stroke="${SLATE}" stroke-opacity=".15"/>
    <circle cx="600" cy="440" r="300" fill="none" stroke="${PAPER}" stroke-opacity=".1" stroke-dasharray="2 11"/>
    <g transform="rotate(-14 600 450)">
      <g fill="none" stroke="${PAPER}" stroke-opacity=".62" stroke-width="7" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="330" cy="450" r="128"/>
        <circle cx="330" cy="450" r="78"/>
        <circle cx="330" cy="450" r="24"/>
        <path d="M398 360c38-28 70-12 68 22-2 34-44 50-58 30"/>
        <path d="M398 540c38 28 70 12 68-22-2-34-44-50-58-30"/>
        <path d="M456 450h420"/>
        <path d="M620 450v52h52v-44"/>
        <path d="M740 450v82h58v-70"/>
        <path d="M456 424v52"/>
      </g>
      <g fill="${PAPER}" opacity=".45">
        <circle cx="330" cy="450" r="7"/>
        <circle cx="654" cy="490" r="4"/>
        <circle cx="778" cy="520" r="4"/>
      </g>
    </g>
    <g transform="translate(820 240)">
      <circle cx="0" cy="0" r="66" fill="none" stroke="${SLATE}" stroke-opacity=".16"/>
      <circle cx="0" cy="0" r="10" fill="${SLATE}" opacity=".22"/>
      <path d="M0 10v57" stroke="${SLATE}" stroke-opacity=".16" stroke-width="14"/>
    </g>
    ${cornerMarks(width, height)}
    <g font-family="${SANS}" font-size="19" fill="${SLATE}">
      <text x="78" y="820">The 48-Hour Key</text>
      <text x="${width - 78}" y="820" text-anchor="end">A beginning</text>
    </g>
    <line x1="78" y1="790" x2="${width - 78}" y2="790" stroke="${PAPER}" stroke-opacity=".12"/>
  `;
  return page(width, height, body, "", 77);
}

function doorPage() {
  const width = 1600;
  const height = 1000;
  const defs = `
    <linearGradient id="doorLight" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="${PAPER}" stop-opacity=".88"/>
      <stop offset=".66" stop-color="${PAPER}" stop-opacity=".58"/>
      <stop offset="1" stop-color="${PAPER}" stop-opacity=".24"/>
    </linearGradient>
    <linearGradient id="lightSpill" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="${PAPER}" stop-opacity=".17"/>
      <stop offset="1" stop-color="${PAPER}" stop-opacity="0"/>
    </linearGradient>
    <linearGradient id="doorShade" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="${INK}" stop-opacity=".72"/>
      <stop offset="1" stop-color="${INK}" stop-opacity=".1"/>
    </linearGradient>
  `;
  const body = `
    <rect width="${width}" height="${height}" fill="#071427"/>
    <g stroke="${PAPER}" stroke-opacity=".055">
      <line x1="0" y1="150" x2="1600" y2="150"/>
      <line x1="0" y1="230" x2="1600" y2="230"/>
      <line x1="280" y1="0" x2="280" y2="1000"/>
      <line x1="640" y1="0" x2="640" y2="1000"/>
    </g>

    <rect x="1010" y="92" width="470" height="830" fill="#030E1E"/>
    <rect x="1050" y="132" width="392" height="790" fill="url(#doorLight)"/>
    <rect x="1068" y="150" width="356" height="772" fill="url(#doorLight)" opacity=".65"/>
    <rect x="1010" y="92" width="470" height="830" fill="none" stroke="${PAPER}" stroke-opacity=".28" stroke-width="2"/>
    <rect x="1030" y="112" width="430" height="810" fill="none" stroke="${PAPER}" stroke-opacity=".12"/>

    <path d="M1050 132 L902 80 L902 1000 L1050 922 Z" fill="#061326" stroke="${PAPER}" stroke-opacity=".2"/>
    <path d="M1050 132 L902 80 L902 1000 L1050 922 Z" fill="url(#doorShade)" opacity=".45"/>
    <path d="M1050 132 L902 80" stroke="${PAPER}" stroke-opacity=".2"/>
    <circle cx="984" cy="560" r="7" fill="${PAPER}" opacity=".65"/>

    <path d="M1050 922 L1442 922 L1600 1000 L1010 1000 Z" fill="url(#lightSpill)"/>
    <path d="M902 1000 L1050 922 L1442 922 L1600 1000 Z" fill="${PAPER}" opacity=".035"/>
    <line x1="0" y1="922" x2="1600" y2="922" stroke="${PAPER}" stroke-opacity=".08"/>
    <ellipse cx="1250" cy="930" rx="340" ry="34" fill="${PAPER}" opacity=".06" filter="url(#blur40)"/>

    <g fill="none" stroke="${PAPER}" stroke-opacity=".07">
      <path d="M160 260h310v400H160z"/>
      <path d="M190 290h250v340H190z"/>
    </g>
    <circle cx="1250" cy="520" r="610" fill="none" stroke="${PAPER}" stroke-opacity=".08"/>
    ${cornerMarks(width, height)}
  `;
  return page(width, height, body, defs, 19);
}

function portraitPage() {
  const width = 900;
  const height = 1125;

  const head =
    "M 300 365 C 300 250 375 170 475 170 C 580 170 640 235 640 330 C 640 365 628 388 615 405 C 606 417 607 426 615 438 C 632 458 674 474 660 495 C 651 510 630 510 620 520 C 610 531 622 540 627 551 C 632 562 620 575 610 588 C 598 603 596 625 580 655 C 556 695 510 720 480 750 C 470 760 468 775 468 800 L 468 900 L 340 900 L 340 790 C 310 735 285 670 280 590 C 275 505 280 420 300 365 Z";

  const faceRim =
    "M 475 170 C 580 170 640 235 640 330 C 640 365 628 388 615 405 C 606 417 607 426 615 438 C 632 458 674 474 660 495 C 651 510 630 510 620 520 C 610 531 622 540 627 551 C 632 562 620 575 610 588 C 598 603 596 625 580 655 C 556 695 510 720 480 750";

  const body = `
    <circle cx="492" cy="485" r="388" fill="none" stroke="${SLATE}" stroke-opacity=".14"/>
    <circle cx="492" cy="485" r="346" fill="${MIDNIGHT}" opacity=".26"/>

    <path d="M 70 1125 C 100 1000 182 916 306 876 L 350 854 L 446 940 C 463 954 485 956 502 944 L 598 854 C 702 892 776 990 800 1125 Z" fill="#0A1C35" stroke="${PAPER}" stroke-opacity=".11" stroke-width="1.5"/>
    <path d="M 350 854 L 340 785 L 468 785 L 468 915" fill="#0A1C35" stroke="${PAPER}" stroke-opacity=".08" stroke-width="1.5"/>

    <path d="${head}" fill="#0C2341" stroke="${PAPER}" stroke-opacity=".22" stroke-width="1.5"/>
    <path d="${faceRim}" fill="none" stroke="${PAPER}" stroke-opacity=".46" stroke-width="2" stroke-linecap="round"/>
    <path d="M 280 590 C 300 660 318 720 341 781" fill="none" stroke="${PAPER}" stroke-opacity=".07"/>
    <path d="M 392 940 L 520 1022 L 641 933" fill="none" stroke="${PAPER}" stroke-opacity=".11" stroke-width="1.5"/>
    <path d="M 322 1036 L 464 1036" stroke="${PAPER}" stroke-opacity=".16"/>
    ${cornerMarks(width, height)}
  `;

  return page(width, height, body, "", 23);
}

function ogPage() {
  const width = 1200;
  const height = 630;
  const defs = `
    <clipPath id="brainClip">
      <path d="${BRAIN_LEFT}"/>
      <path d="${BRAIN_RIGHT}"/>
    </clipPath>
  `;
  const body = `
    <rect x="40" y="40" width="1120" height="550" fill="none" stroke="${GOLD}" stroke-opacity=".22"/>
    <circle cx="1000" cy="300" r="250" fill="url(#goldGlow)" opacity=".23"/>
    <circle cx="1000" cy="300" r="205" fill="none" stroke="${GOLD}" stroke-opacity=".16"/>
    <g transform="translate(854 164) scale(12.1)">
      <path d="${BRAIN_LEFT}" fill="#0B203A" fill-opacity=".7" stroke="${PAPER}" stroke-opacity=".45" stroke-width=".075"/>
      <path d="${BRAIN_RIGHT}" fill="#0B203A" fill-opacity=".7" stroke="${PAPER}" stroke-opacity=".45" stroke-width=".075"/>
      <circle cx="14" cy="10" r=".9" fill="${GOLD}"/>
    </g>
    <g font-family="${SANS}" fill="${SLATE}">
      <text x="96" y="132" font-size="23">Farhan Khawaja, PhD, neuroscientist</text>
    </g>
    <g font-family="${SERIF}" fill="${PAPER}">
      <text x="92" y="268" font-size="88">The Limitless</text>
      <text x="92" y="360" font-size="88" fill="${GOLD}">Black Book</text>
    </g>
    <g font-family="${SANS}" fill="${PAPER}">
      <text x="96" y="432" font-size="27">It’s not your personality.</text>
      <text x="96" y="472" font-size="27">It’s three locks in your brain.</text>
    </g>
    <g font-family="${SANS}" fill="${SLATE}">
      <text x="96" y="538" font-size="20">A 21-day protocol for fear, comfort and status.</text>
    </g>
  `;
  return page(width, height, body, defs, 31);
}

async function writeJpg(name, svg, width, height) {
  const file = path.join(OUT, name);
  await sharp(Buffer.from(svg))
    .resize(width, height, { fit: "cover" })
    .jpeg({ quality: 84, mozjpeg: true, chromaSubsampling: "4:4:4" })
    .toFile(file);
  console.log("wrote", file);
}

await mkdir(OUT, { recursive: true });

await writeJpg("hero-brain.jpg", brainPlate("none"), 1200, 1500);
await writeJpg("fear.jpg", brainPlate("fear"), 1200, 1500);
await writeJpg("comfort.jpg", brainPlate("comfort"), 1200, 1500);
await writeJpg("status.jpg", brainPlate("status"), 1200, 1500);
await writeJpg("key.jpg", keyPage(), 1200, 900);
await writeJpg("door.jpg", doorPage(), 1600, 1000);
await writeJpg("cover.jpg", coverPage(), 1200, 1500);
await writeJpg("hardcover.jpg", hardcoverPage(), 1200, 1500);
await writeJpg("farhan.jpg", portraitPage(), 900, 1125);

await sharp(Buffer.from(ogPage()))
  .resize(1200, 630, { fit: "cover" })
  .jpeg({ quality: 86, mozjpeg: true, chromaSubsampling: "4:4:4" })
  .toFile(path.join(process.cwd(), "app", "opengraph-image.jpg"));
console.log("wrote app/opengraph-image.jpg");
