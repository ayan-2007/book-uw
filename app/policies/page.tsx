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
    <div id="top">
      <SiteHeader showBuy={false} />

      <main id="main-content">
        <article className="container-page py-16 md:py-24">
          <div className="max-w-letter">
            <h1 className="font-serif text-3xl text-paper">
              Policies and contact
            </h1>
            <p className="mt-4 font-sans text-base text-slate">
              Last updated in November 2026.
            </p>

            <div className="mt-12 space-y-12">
              <section aria-labelledby="contact">
                <h2 id="contact" className="font-serif text-2xl text-paper">
                  Contact
                </h2>
                <div className="mt-4 font-sans text-lg text-paper">
                  <p>
                    For order questions, refunds, shipping or anything else,
                    email{" "}
                    <a
                      href={`mailto:${siteConfig.email}`}
                      className="link"
                    >
                      {siteConfig.email}
                    </a>
                    .
                  </p>
                </div>
              </section>

              <section
                aria-labelledby="privacy"
                className="border-t border-line pt-12"
              >
                <h2 id="privacy" className="font-serif text-2xl text-paper">
                  Privacy
                </h2>
                <div className="mt-4 space-y-4 font-sans text-lg text-paper">
                  <p>
                    This site does not use analytics, advertising pixels or
                    marketing cookies. If you order, our checkout provider
                    processes your payment. We receive the details needed to
                    fulfill the order, such as your name, email address and
                    shipping address.
                  </p>
                  <p>
                    Our hosting provider keeps standard security and
                    reliability logs. To ask for a copy of your data, or to ask
                    us to delete it, email{" "}
                    <a
                      href={`mailto:${siteConfig.email}`}
                      className="link"
                    >
                      {siteConfig.email}
                    </a>
                    .
                  </p>
                </div>
              </section>

              <section
                aria-labelledby="terms"
                className="border-t border-line pt-12"
              >
                <h2 id="terms" className="font-serif text-2xl text-paper">
                  Terms
                </h2>
                <div className="mt-4 space-y-4 font-sans text-lg text-paper">
                  <p>
                    The Limitless Black Book is educational material. It is not
                    medical advice, diagnosis or treatment. If you’re dealing
                    with anxiety, depression or a medical condition, keep
                    working with your doctor.
                  </p>
                  <p>
                    Prices are shown in US dollars. Orders are completed
                    through our checkout provider, and their terms also apply.
                    We may update these terms; the current version is always on
                    this page.
                  </p>
                </div>
              </section>

              <section
                aria-labelledby="refund-policy"
                className="border-t border-line pt-12"
              >
                <h2
                  id="refund-policy"
                  className="font-serif text-2xl text-paper"
                >
                  Refund policy
                </h2>
                <div className="mt-4 font-sans text-lg text-paper">
                  <p>
                    Do the 21 days. If you don’t feel the difference, email{" "}
                    <a
                      href={`mailto:${siteConfig.email}`}
                      className="link"
                    >
                      {siteConfig.email}
                    </a>{" "}
                    within 60 days of your order and we’ll refund every cent.
                  </p>
                </div>
              </section>

              <section
                aria-labelledby="shipping"
                className="border-t border-line pt-12"
              >
                <h2 id="shipping" className="font-serif text-2xl text-paper">
                  Shipping
                </h2>
                <div className="mt-4 font-sans text-lg text-paper">
                  <p>
                    Orders ship within 2 business days and arrive in 7 to 13
                    business days. Shipping is free to the US, UK and Europe.
                    For delivery outside those regions, email{" "}
                    <a
                      href={`mailto:${siteConfig.email}`}
                      className="link"
                    >
                      {siteConfig.email}
                    </a>{" "}
                    before you order.
                  </p>
                </div>
              </section>
            </div>
          </div>
        </article>
      </main>

      <SiteFooter />
    </div>
  );
}
