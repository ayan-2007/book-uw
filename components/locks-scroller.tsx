"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { locks } from "@/data/locks";

type LocksScrollerProps = {
  visuals: ReactNode[];
  inlineVisuals: ReactNode[];
};

export function LocksScroller({ visuals, inlineVisuals }: LocksScrollerProps) {
  const [active, setActive] = useState(0);
  const panels = useRef<Array<HTMLElement | null>>([]);

  useEffect(() => {
    const elements = panels.current.filter(Boolean) as HTMLElement[];
    if (!elements.length || !("IntersectionObserver" in window)) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const index = Number(
            (entry.target as HTMLElement).dataset.lockIndex,
          );
          if (Number.isInteger(index)) setActive(index);
        });
      },
      { rootMargin: "-40% 0px -40% 0px", threshold: 0 },
    );

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="mt-12 lg:mt-16 lg:grid lg:grid-cols-12 lg:gap-16">
      <div className="hidden lg:sticky lg:top-24 lg:col-span-5 lg:block lg:self-start">
        <div className="relative aspect-[4/5] overflow-hidden border border-line bg-surface">
          {locks.map((lock, index) => (
            <div
              key={lock.id}
              aria-hidden={index !== active}
              className={[
                "lock-slide absolute inset-0",
                index === active ? "opacity-100" : "opacity-0",
              ].join(" ")}
            >
              {visuals[index]}
            </div>
          ))}
        </div>
        <p className="mt-3 font-sans text-base text-slate">
          <span className="text-paper">{locks[active].name}</span>,{" "}
          {locks[active].week.toLowerCase()}
        </p>
      </div>

      <div className="lg:col-span-7">
        {locks.map((lock, index) => (
          <article
            key={lock.id}
            id={lock.id}
            ref={(node) => {
              panels.current[index] = node;
            }}
            data-lock-index={index}
            className={[
              "pt-8",
              index === 0 ? "" : "border-t border-line",
              "lg:flex lg:min-h-[64vh] lg:flex-col lg:justify-center lg:border-t lg:border-line lg:py-12",
            ].join(" ")}
          >
            <div className="mb-6 lg:hidden">{inlineVisuals[index]}</div>

            <p className="font-sans text-base text-slate">{lock.week}</p>
            <h3 className="mt-2 font-serif text-2xl text-paper">{lock.name}</h3>
            <p className="mt-2 font-sans text-lg font-medium text-paper">
              {lock.tagline}
            </p>
            <p className="mt-4 font-sans text-lg text-paper">{lock.body}</p>

            <div className="mt-6">
              <p className="font-sans text-base text-slate">Protocols</p>
              <ul className="mt-3 space-y-2 border-l border-line pl-4">
                {lock.protocols.map((protocol) => (
                  <li
                    key={protocol}
                    className="font-sans text-lg text-paper"
                  >
                    {protocol}
                  </li>
                ))}
              </ul>
            </div>

            <p className="mt-6 border-t border-line pt-4 font-serif text-xl text-paper">
              Outcome:{" "}
              <span className="text-paper">{lock.outcome}</span>
            </p>
          </article>
        ))}
      </div>
    </div>
  );
}
