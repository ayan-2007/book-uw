import { siteConfig } from "@/lib/site";

const protocolLinks = [
  { label: "The Letter", href: "#letter" },
  { label: "Three Locks", href: "#locks" },
  { label: "The 21 Days", href: "#days" },
  { label: "Inside the Book", href: "#inside" },
  { label: "Clinical Comparison", href: "#comparison" },
];

const policyLinks = [
  { label: "Direct Support", href: `mailto:${siteConfig.email}` },
  { label: "Privacy Policy", href: "/policies#privacy" },
  { label: "Terms of Service", href: "/policies#terms" },
  { label: "60-Day Guarantee", href: "/policies#refund-policy" },
  { label: "Worldwide Shipping", href: "/policies#shipping" },
];

export function SiteFooter() {
  return (
    <footer className="footer">
      <div className="container-page">
        <div className="footer__grid">
          <div className="footer__brand-col">
            <span className="footer__wordmark">{siteConfig.name}</span>
            <p className="footer__tagline">
              A 21-day clinical neuroscience protocol targeting the three primal survival
              locks: Fear, Comfort, and Status. Author: {siteConfig.author}, {siteConfig.authorRole}.
            </p>
            <div className="footer__badge">
              <span>Standard Edition &bull; Archival Hardcover + Field Journal</span>
            </div>
          </div>

          <div className="footer__col">
            <h3 className="footer__heading">Navigation</h3>
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

          <div className="footer__col">
            <h3 className="footer__heading">Support & Guarantee</h3>
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
            Educational material based on neuroscience. Not medical advice or treatment. If managing clinical anxiety or medical conditions, consult your physician.
          </p>
          <p className="footer__copy">
            &copy; {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
