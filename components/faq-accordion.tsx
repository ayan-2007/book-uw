"use client";

import { useState } from "react";
import { siteConfig } from "@/lib/site";

type FAQItem = {
  question: string;
  answer: string;
};

export function FAQAccordion({ items }: { items: FAQItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <div className="faq-list">
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        return (
          <div
            key={item.question}
            className={`faq-card ${isOpen ? "is-open" : ""}`}
          >
            <button
              type="button"
              id={`faq-btn-${index}`}
              aria-expanded={isOpen}
              aria-controls={`faq-panel-${index}`}
              onClick={() => toggle(index)}
              className="faq-card__trigger"
            >
              <span className="faq-card__question">{item.question}</span>
              <span className="faq-card__indicator" aria-hidden="true">
                <svg
                  viewBox="0 0 16 16"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  className="faq-card__icon"
                >
                  <line x1="8" y1="3" x2="8" y2="13" className="faq-card__vertical" />
                  <line x1="3" y1="8" x2="13" y2="8" />
                </svg>
              </span>
            </button>

            <div
              id={`faq-panel-${index}`}
              role="region"
              aria-labelledby={`faq-btn-${index}`}
              hidden={!isOpen}
              className="faq-card__panel"
            >
              <div className="faq-card__answer">
                {item.question === "How does the guarantee work?" ? (
                  <p>
                    Email{" "}
                    <a href={`mailto:${siteConfig.email}`} className="link">
                      {siteConfig.email}
                    </a>{" "}
                    within 60 days of your order and we’ll refund every cent.
                  </p>
                ) : (
                  <p>{item.answer}</p>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
