import { images, type SiteImage } from "@/lib/images";

export type Lock = {
  id: string;
  week: string;
  name: string;
  tagline: string;
  body: string;
  protocols: string[];
  outcome: string;
  image: SiteImage;
};

export const locks: Lock[] = [
  {
    id: "fear",
    week: "Week 1",
    name: "Fear",
    tagline: "Stop flinching",
    body: "Your brain fires the same alarm before a hard conversation that it once fired before a predator. This week you learn to settle it in under two minutes, and act anyway.",
    protocols: [
      "The 90-second reset",
      "The 48-Hour Key",
      "The sleep rule that turns the alarm down",
    ],
    outcome: "Calm under pressure.",
    image: images.fear,
  },
  {
    id: "comfort",
    week: "Week 2",
    name: "Comfort",
    tagline: "Break the loop",
    body: "Every scroll, every snack, every ‘I’ll start Monday’ is a hit of dopamine. This week you break the loop so hard things stop feeling heavier than they are.",
    protocols: [
      "The phone-down protocol",
      "The two-minute start",
      "The reward swap",
    ],
    outcome: "Drive and follow-through.",
    image: images.comfort,
  },
  {
    id: "status",
    week: "Week 3",
    name: "Status",
    tagline: "Own the room",
    body: "Your brain ranks every room within seconds. This week you change the signals you send: how you stand, speak, pause and ask.",
    protocols: ["The power pause", "The voice drill", "The first-ask protocol"],
    outcome: "Presence.",
    image: images.status,
  },
];
