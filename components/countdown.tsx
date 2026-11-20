"use client";

import { useEffect, useState } from "react";

type CountdownProps = {
  endDate: string;
};

function parts(end: number, now: number) {
  const remaining = Math.max(0, end - now);
  const totalMinutes = Math.floor(remaining / 60_000);
  const days = Math.floor(totalMinutes / (60 * 24));
  const hours = Math.floor((totalMinutes % (60 * 24)) / 60);
  const minutes = totalMinutes % 60;

  return `${days}d ${String(hours).padStart(2, "0")}h ${String(minutes).padStart(2, "0")}m`;
}

export function Countdown({ endDate }: CountdownProps) {
  const end = Date.parse(endDate);
  const [now, setNow] = useState<number | null>(null);

  useEffect(() => {
    if (!Number.isFinite(end)) return;

    const tick = () => setNow(Date.now());
    tick();
    const id = window.setInterval(tick, 30_000);

    return () => window.clearInterval(id);
  }, [end]);

  if (!Number.isFinite(end)) return null;
  if (now !== null && end <= now) return null;

  return (
    <p className="font-sans text-sm text-slate">
      Offer ends in{" "}
      <time
        dateTime={endDate}
        className="inline-block min-w-24 tabular-nums text-paper"
      >
        {now === null ? "—" : parts(end, now)}
      </time>
    </p>
  );
}
