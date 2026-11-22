import type { Metadata } from "next";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Policies and contact",
  description:
    "Contact, privacy, terms, refunds and shipping for The Limitless Black Book.",
  alternates: {
    canonical: "/policies",
  },
};

export default function PoliciesPage() {
  return (
    <div id="top" className="site-wrapper">
      <SiteHeader showBuy={false} />

      <main id="main-content" className="page">
        <div className="container">
          <div className="page__header">
            <a href="/" className="page__back">
              <svg
                aria-hidden="true"
                viewBox="0 0 16 16"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                width="14"
                height="14"
              >
                <line x1="13" y1="8" x2="3" y2="8" />
                <polyline points="7 4 3 8 7 12" />
              </svg>
              Back to the book
            </a>
            <h1 className="page__title">Policies and contact</h1>
            <p className="page__lead">
              The plain-language version of how orders, privacy and refunds
              work.
            </p>
            <p className="page__meta">Last updated November 2026.</p>
          </div>

          <div className="page__sections">
            <section id="contact" className="page__section" aria-labelledby="contact-title">
              <h2 id="contact-title">Contact</h2>
              <p>
                For order questions, refunds, shipping or anything else, email{" "}
                <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>.
              </p>
            </section>

            <section id="privacy" className="page__section" aria-labelledby="privacy-title">
              <h2 id="privacy-title">Privacy</h2>
              <p>
                This site does not use analytics, advertising pixels or marketing
                cookies. If you order, our checkout provider processes your
                payment. We receive the details needed to fulfill the order, such
                as your name, email address and shipping address.
              </p>
              <p>
                Our hosting provider keeps standard security and reliability
                logs. To ask for a copy of your data, or to ask us to delete it,
                email <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>.
              </p>
            </section>

            <section id="terms" className="page__section" aria-labelledby="terms-title">
              <h2 id="terms-title">Terms</h2>
              <p>
                The Limitless Black Book is educational material. It is not
                medical advice, diagnosis or treatment. If you’re dealing with
                anxiety, depression or a medical condition, keep working with
                your doctor.
              </p>
              <p>
                Prices are shown in US dollars. Orders are completed through our
                checkout provider, and their terms also apply. We may update
                these terms; the current version is always on this page.
              </p>
            </section>

            <section
              id="refund-policy"
              className="page__section"
              aria-labelledby="refund-title"
            >
              <h2 id="refund-title">Refund policy</h2>
              <p>
                Do the 21 days. If you don’t feel the difference, email{" "}
                <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>{" "}
                within 60 days of your order and we’ll refund every cent.
              </p>
            </section>

            <section id="shipping" className="page__section" aria-labelledby="shipping-title">
              <h2 id="shipping-title">Shipping</h2>
              <p>
                Orders ship within 2 business days and arrive in 7 to 13
                business days. Shipping is free to the US, UK and Europe. For
                delivery outside those regions, email{" "}
                <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>{" "}
                before you order.
              </p>
            </section>
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
