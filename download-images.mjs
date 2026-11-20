import { mkdir, writeFile } from "node:fs/promises";

const BASE = "https://limitless-black-book.vercel.app/assets";
const OUT = "public/img";

const files = [
  ["hardcover.jpg", "/img/r17/light/hardcover.jpg"],
  ["book-standing.jpg", "/img/r17/light/pr-stand.jpg"],
  ["journal.jpg", "/img/r17/light/journal.jpg"],
  ["book-and-journal.jpg", "/img/r17/light/set-hj.jpg"],
  ["cover.jpg", "/cover/r17/cover.jpg"],
  ["hero-brain.jpg", "/img/v5/hero-g.jpg"],
  ["brain-waking.jpg", "/img/v5/hero.jpg"],
  ["fear.jpg", "/img/v5/fear.jpg"],
  ["comfort.jpg", "/img/v5/comfort.jpg"],
  ["status.jpg", "/img/v5/status.jpg"],
  ["day-1.jpg", "/img/v5/st1.jpg"],
  ["week-1.jpg", "/img/v5/st2.jpg"],
  ["week-2.jpg", "/img/v5/st3.jpg"],
  ["week-3.jpg", "/img/v5/st4-g.jpg"],
  ["factory.jpg", "/img/v5/factory.jpg"],
  ["key.jpg", "/img/v5/key.jpg"],
  ["routine.jpg", "/img/v5/routine.jpg"],
  ["door.jpg", "/img/v5/door.jpg"],
  ["farhan.jpg", "/img/farhan-1.jpg"],
  ["mike.jpg", "/img/r17/students/mike-a.jpg"],
  ["mike-avatar.jpg", "/img/students/mike-av.jpg"],
  ["zander.jpg", "/img/r17/students/zander-a.jpg"],
  ["zander-avatar.jpg", "/img/students/zander-av.jpg"],
  ["group-1.jpg", "/img/r17/grp-1.jpg"],
  ["group-2.jpg", "/img/r17/grp-2.jpg"],
  ["group-3.jpg", "/img/r17/grp-3.jpg"],
];

await mkdir(OUT, { recursive: true });
for (const [name, path] of files) {
  try {
    const res = await fetch(BASE + path, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
        "Referer": "https://limitless-black-book.vercel.app/"
      }
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    await writeFile(`${OUT}/${name}`, Buffer.from(await res.arrayBuffer()));
    console.log("saved  ", name);
  } catch (e) {
    console.log("FAILED ", name, "-", e.message);
  }
}