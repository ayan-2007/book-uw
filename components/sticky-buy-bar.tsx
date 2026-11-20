"use client";

import { useEffect, useState } from "react";
import { siteConfig } from "@/lib/site";

type StickyBuyBarProps = {
  checkoutUrl: string;
};

export function StickyBuyBar({ checkoutUrl }: StickyBuyBarProps) {
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
    <div role="region" aria-label="Purchase" className="sticky-buy md:hidden">
      <div className="mx-auto flex max-w-page items-center justify-between gap-4">
        <p className="font-serif text-xl leading-none text-paper">
          <span className="sr-only">Sale price $97, regular price $179.</span>
          <span aria-hidden="true">
            <span className="tabular-nums">$97</span>
            <s className="ml-2 font-sans text-sm leading-none text-slate tabular-nums">
              $179
            </s>
          </span>
        </p>
        <a href={checkoutUrl} className="btn btn-primary">
          {siteConfig.buyLabel}
        </a>
      </div>
    </div>
  );
}
