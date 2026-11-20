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
    <div className="locks">
      <div className="locks__visual">
        <div className="lock-frame">
          {locks.map((lock, index) => (
            <div
              key={lock.id}
              aria-hidden={index !== active}
              className="lock-slide"
              style={{ opacity: index === active ? 1 : 0 }}
            >
              {visuals[index]}
            </div>
          ))}
        </div>
        <p className="locks__caption">
          <strong>{locks[active].name}</strong>
          <span>
            {locks[active].week} — {locks[active].tagline}
          </span>
        </p>
      </div>

      <div>
        {locks.map((lock, index) => (
          <article
            key={lock.id}
            id={lock.id}
            ref={(node) => {
              panels.current[index] = node;
            }}
            data-lock-index={index}
            className="lock-panel"
          >
            <div className="lock-panel__inline">{inlineVisuals[index]}</div>

            <p className="lock-panel__week">{lock.week}</p>
            <h3>{lock.name}</h3>
            <p className="lock-panel__tagline">{lock.tagline}</p>
            <p className="lock-panel__body">{lock.body}</p>

            <ul className="lock-panel__protocols">
              {lock.protocols.map((protocol) => (
                <li key={protocol}>{protocol}</li>
              ))}
            </ul>

            <p className="lock-panel__outcome">
              Outcome: <strong>{lock.outcome}</strong>
            </p>
          </article>
        ))}
      </div>
    </div>
  );
}
