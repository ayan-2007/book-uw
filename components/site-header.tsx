"use client";

import { useEffect, useState } from "react";
import { BuyButton } from "@/components/buy-button";
import { Countdown } from "@/components/countdown";
import { siteConfig } from "@/lib/site";

type SiteHeaderProps = {
  showBuy?: boolean;
};

const navLinks = [
  { href: "#letter", label: "The Letter" },
  { href: "#locks", label: "Three Locks" },
  { href: "#days", label: "21 Days" },
  { href: "#inside", label: "Inside the Book" },
  { href: "#author", label: "The Author" },
  { href: "#comparison", label: "Comparison" },
  { href: "#faq", label: "FAQ" },
];

export function SiteHeader({ showBuy = true }: SiteHeaderProps) {
  const saleEnd = process.env.NEXT_PUBLIC_SALE_END?.trim();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);

    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <header
      className={[
        "site-header",
        scrolled ? "is-scrolled" : "",
        open ? "is-open" : "",
      ]
        .join(" ")
        .trim()}
    >
      <div className="container-page site-header__inner">
        <a
          href="/"
          className="site-header__wordmark"
          onClick={() => setOpen(false)}
        >
          <span className="site-header__title">{siteConfig.name}</span>
          <span className="site-header__subtitle">
            <span className="site-header__dot" aria-hidden="true" />
            {siteConfig.author} &bull; {siteConfig.authorRole}
          </span>
        </a>

        <nav className="site-nav" aria-label="Primary navigation">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} className="nav-link">
              {link.label}
            </a>
          ))}
        </nav>

        <div className="site-header__actions">
          {saleEnd ? (
            <div className="header-countdown">
              <Countdown endDate={saleEnd} />
            </div>
          ) : null}
          {showBuy ? <BuyButton className="btn--header" /> : null}
          <button
            type="button"
            className="menu-toggle"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close navigation menu" : "Open navigation menu"}
            onClick={() => setOpen((value) => !value)}
          >
            <span className="menu-toggle__lines" aria-hidden="true" />
          </button>
        </div>
      </div>

      {open ? (
        <div className="mobile-menu" id="mobile-menu">
          <div className="mobile-menu__inner container-page">
            <nav aria-label="Mobile navigation" className="mobile-menu__links">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="mobile-nav-link"
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </a>
              ))}
            </nav>
            <div className="mobile-menu__cta">
              <BuyButton
                className="btn--lg w-full justify-center"
                onClick={() => setOpen(false)}
              />
              <p className="mobile-menu__note">
                Hardcover edition &bull; Field journal &bull; 60-day refund
              </p>
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
}
