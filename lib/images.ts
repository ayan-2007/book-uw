export type SiteImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

export const images = {
  heroBrain: {
    src: "/img/hero-brain.jpg",
    alt: "A fine gold line drawing of a human brain on a dark navy field.",
    width: 1200,
    height: 1500,
  },
  fear: {
    src: "/img/fear.jpg",
    alt: "A dark brain illustration with the fear response marked in gold.",
    width: 1200,
    height: 1500,
  },
  comfort: {
    src: "/img/comfort.jpg",
    alt: "A dark brain illustration with the reward loop marked in gold.",
    width: 1200,
    height: 1500,
  },
  status: {
    src: "/img/status.jpg",
    alt: "A dark brain illustration with the status network marked in gold.",
    width: 1200,
    height: 1500,
  },
  key: {
    src: "/img/key.jpg",
    alt: "An antique key drawn in gold line on a dark navy field.",
    width: 1200,
    height: 900,
  },
  door: {
    src: "/img/door.jpg",
    alt: "A dark doorway opening onto a warm, low light.",
    width: 1600,
    height: 1000,
  },
  hardcover: {
    src: "/img/hardcover.jpg",
    alt: "The Limitless Black Book hardcover standing on a dark surface.",
    width: 1200,
    height: 1500,
  },
  cover: {
    src: "/img/cover.jpg",
    alt: "The front cover of The Limitless Black Book.",
    width: 1200,
    height: 1500,
  },
  farhan: {
    src: "/img/farhan.jpg",
    alt: "Portrait of Farhan Khawaja, PhD.",
    width: 900,
    height: 1125,
  },
} satisfies Record<string, SiteImage>;
