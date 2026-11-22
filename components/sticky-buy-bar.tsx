"use client";

import { useEffect, useState } from "react";

export function StickyBuyBar({ checkoutUrl }: { checkoutUrl: string }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const hero = document.getElementById("hero");
    if (!hero || !("IntersectionObserver" in window)) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const pastHero =
          !entry.isIntersecting && entry.boundingClientRect.bottom <= 0;
        setVisible(pastHero);
      },
      { threshold: 0 },
    );

    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  if (!visible) return null;

  return (
    <aside aria-label="Quick purchase bar" className="sticky-buy">
      <div className="container sticky-buy__inner">
        <div className="sticky-buy__price">
          <strong>$97</strong>
          <span>Hardcover + journal</span>
        </div>

        <a href={checkoutUrl} className="btn btn-primary btn--sticky">
          Get the book
        </a>
      </div>
    </aside>
  );
}
