"use client";

import { useEffect, useState } from "react";
import { BuyButton } from "@/components/buy-button";
import { siteConfig } from "@/lib/site";

type SiteHeaderProps = {
  showBuy?: boolean;
};

const navLinks = [
  { href: "/#locks", label: "The locks" },
  { href: "/#days", label: "21 days" },
  { href: "/#offer", label: "The edition" },
  { href: "/#faq", label: "FAQ" },
];

export function SiteHeader({ showBuy = true }: SiteHeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
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
      <div className="container site-header__inner">
        <a
          href="/"
          className="brand"
          aria-label={`${siteConfig.name} — home`}
          onClick={() => setOpen(false)}
        >
          <span className="brand__name">{siteConfig.name}</span>
          <span className="brand__sub">{siteConfig.author}</span>
        </a>

        <nav className="site-nav" aria-label="Primary navigation">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} className="nav-link">
              {link.label}
            </a>
          ))}
        </nav>

        <div className="site-header__actions">
          {showBuy ? (
            <BuyButton className="btn--header header-cta">
              Get the book, $97
            </BuyButton>
          ) : null}
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
          <div className="container mobile-menu__inner">
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
              {showBuy ? (
                <BuyButton
                  className="btn--lg"
                  onClick={() => setOpen(false)}
                />
              ) : null}
              <p className="mobile-menu__note">
                Hardcover edition · Field journal · 60-day refund
              </p>
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
}
