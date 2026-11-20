import { existsSync } from "node:fs";
import path from "node:path";
import Image from "next/image";
import { BLUR_DATA_URL } from "@/lib/media";

type MediaProps = {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  imageClassName?: string;
  sizes?: string;
  priority?: boolean;
};

/**
 * A fixed-ratio image frame. At render time it checks the public folder, so a
 * missing source becomes a quiet navy placeholder instead of a broken image or
 * a failed build. The frame keeps its dimensions either way.
 */
export function Media({
  src,
  alt,
  width,
  height,
  className = "",
  imageClassName = "",
  sizes = "100vw",
  priority = false,
}: MediaProps) {
  const exists = existsSync(path.join(process.cwd(), "public", src));

  return (
    <div className={`relative overflow-hidden bg-surface ${className}`}>
      {exists ? (
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          sizes={sizes}
          priority={priority}
          placeholder="blur"
          blurDataURL={BLUR_DATA_URL}
          className={`h-full w-full object-cover ${imageClassName}`}
        />
      ) : (
        <Placeholder alt={alt} />
      )}
    </div>
  );
}

function Placeholder({ alt }: { alt: string }) {
  return (
    <div
      role="img"
      aria-label={alt}
      className="absolute inset-0 flex items-center justify-center bg-ink p-6"
    >
      <div className="w-full max-w-[13rem] border border-line p-6">
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-6 w-6 text-slate"
        >
          <path d="M22 11V5a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h6" />
          <path d="m2 15 6-6 4 4" />
          <circle cx="9" cy="9" r="1.5" />
          <path d="m22 22-6-6" />
          <path d="m16 22 6-6" />
        </svg>
        <p className="mt-4 font-sans text-base leading-[1.6] text-slate">
          Image placeholder
        </p>
      </div>
    </div>
  );
}
