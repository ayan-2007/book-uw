import { siteConfig } from "@/lib/site";

const footerLinks = [
  { label: "Contact", href: `mailto:${siteConfig.email}` },
  { label: "Privacy", href: "/policies#privacy" },
  { label: "Terms", href: "/policies#terms" },
  { label: "Refund policy", href: "/policies#refund-policy" },
  { label: "Shipping", href: "/policies#shipping" },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-line">
      <div className="container-page pb-32 pt-12 md:pb-12">
        <div className="flex flex-col gap-12 md:flex-row md:items-start md:justify-between">
          <div>
            <p className="font-serif text-lg text-paper">{siteConfig.name}</p>
            <p className="mt-2 font-sans text-base text-slate">
              By {siteConfig.author}, neuroscientist.
            </p>
          </div>

          <nav aria-label="Footer">
            <ul className="flex flex-wrap gap-x-6 gap-y-2">
              {footerLinks.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="footer-link text-base">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-line pt-6">
          <p className="font-sans text-base text-paper">
            For education, not medical advice.
          </p>
          <p className="font-sans text-base text-slate">
            © {new Date().getFullYear()} The Limitless Black Book.
          </p>
        </div>
      </div>
    </footer>
  );
}
