import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "The Limitless Black Book",
    short_name: "Limitless",
    description:
      "A 21-day neuroscience protocol for fear, comfort and status, by Farhan Khawaja, PhD.",
    start_url: "/",
    display: "standalone",
    background_color: "#05080e",
    theme_color: "#05080e",
    icons: [
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
    ],
  };
}
