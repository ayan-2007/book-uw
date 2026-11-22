import { siteConfig } from "@/lib/site";

const protocolLinks = [
  { label: "The three locks", href: "/#locks" },
  { label: "The 21 days", href: "/#days" },
  { label: "The edition", href: "/#offer" },
  { label: "FAQ", href: "/#faq" },
];

const policyLinks = [
  { label: "Email us", href: `mailto:${siteConfig.email}` },
  { label: "Privacy", href: "/policies#privacy" },
  { label: "Terms", href: "/policies#terms" },
  { label: "Refunds", href: "/policies#refund-policy" },
  { label: "Shipping", href: "/policies#shipping" },
];

export function SiteFooter() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__grid">
          <div className="footer__brand">
            <span className="footer__wordmark">{siteConfig.name}</span>
            <p className="footer__tagline">
              A 21-day protocol for fear, comfort and status, by{" "}
              {siteConfig.author}.
            </p>
          </div>

          <div>
            <h3 className="footer__heading">Read</h3>
            <ul className="footer__list">
              {protocolLinks.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="footer__link">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="footer__heading">Support</h3>
            <ul className="footer__list">
              {policyLinks.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="footer__link">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="footer__bottom">
          <p className="footer__legal">
            Educational material, not medical advice. If you’re managing a
            medical condition, keep working with your doctor.
          </p>
          <p className="footer__copy">
            © {new Date().getFullYear()} {siteConfig.name}
          </p>
        </div>
      </div>
    </footer>
  );
}
