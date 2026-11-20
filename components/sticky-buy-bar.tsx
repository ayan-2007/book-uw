"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { siteConfig } from "@/lib/site";

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
    <aside
      aria-label="Quick purchase order bar"
      className="sticky-buy"
    >
      <div className="container-page sticky-buy__inner">
        <div className="sticky-buy__book">
          <div className="sticky-buy__thumb">
            <Image
              src="/img/cover.jpg"
              alt="The Limitless Black Book cover"
              width={40}
              height={56}
              className="object-cover"
            />
          </div>
          <div className="sticky-buy__info">
            <div className="sticky-buy__title-row">
              <strong className="sticky-buy__title">{siteConfig.name}</strong>
              <span className="sticky-buy__tag">Hardcover + Journal</span>
            </div>
            <div className="sticky-buy__price-row">
              <strong className="sticky-buy__price">$97</strong>
              <s className="sticky-buy__strike">$179</s>
              <span className="sticky-buy__badge">Save $82 &bull; Free Shipping</span>
            </div>
          </div>
        </div>

        <div className="sticky-buy__action">
          <a
            href={checkoutUrl}
            className="btn btn-primary btn--sticky"
          >
            Claim the Hardcover — $97
          </a>
        </div>
      </div>
    </aside>
  );
}
