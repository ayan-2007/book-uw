import Image from "next/image";
import { BuyButton } from "@/components/buy-button";
import { FAQAccordion } from "@/components/faq-accordion";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { StickyBuyBar } from "@/components/sticky-buy-bar";
import { VignetteBloom } from "@/components/vignette-bloom";
import { siteConfig } from "@/lib/site";
import { vignetteBloomPreset } from "@/lib/vignette-bloom";

const locks = [
  {
    num: "01",
    name: "Fear",
    desc: "The alarm that fires before the ask, the email, the room. You feel it in your chest and call it your personality.",
    week: "Week 1 · Days 1–7",
    result: "Settle the alarm. Act anyway.",
  },
  {
    num: "02",
    name: "Comfort",
    desc: "The loop that rewards the scroll, the snack, the snooze. It feels like rest. It leaves you flatter.",
    week: "Week 2 · Days 8–14",
    result: "Break the loop. Make hard things lighter.",
  },
  {
    num: "03",
    name: "Status",
    desc: "The ranking that runs before you speak. It decides how much space you take, then calls it humility.",
    week: "Week 3 · Days 15–21",
    result: "Change the signals. Take the room.",
  },
];

const phases = [
  {
    days: "Days 1–7",
    name: "Fear",
    desc: "Settle the alarm and make one real move within 48 hours.",
  },
  {
    days: "Days 8–14",
    name: "Comfort",
    desc: "Break the loop and practice doing the harder thing on purpose.",
  },
  {
    days: "Days 15–21",
    name: "Status",
    desc: "Change the signals you send and hold your ground in the room.",
  },
];

const inclusions = [
  "The hardcover. The full protocol, in order.",
  "The field journal. Free with every order.",
  "The private readers group. For people doing the work.",
];

const faqs = [
  {
    question: "Is it too late in my 50s?",
    answer:
      "No. The brain keeps changing with practice. That’s called neuroplasticity.",
  },
  {
    question: "How much time per day?",
    answer: "Fifteen to twenty minutes.",
  },
  {
    question: "Is this therapy or medical advice?",
    answer:
      "No. If you’re dealing with anxiety, depression or a medical condition, keep working with your doctor.",
  },
  {
    question: "Is this about manipulating people?",
    answer: "No. It’s about you: steadier, more disciplined, more present.",
  },
  {
    question: "When do I get it?",
    answer:
      "Orders ship within 2 business days and arrive in 7 to 13 business days. Shipping is free to the US, UK and Europe.",
  },
  {
    question: "What if I fall behind?",
    answer: "Pick up where you left off.",
  },
  {
    question: "How does the guarantee work?",
    answer:
      "Email support@aphro-d.com within 60 days of your order and we’ll refund every cent.",
  },
];

function CheckIcon() {
  return (
    <span className="offer__check" aria-hidden="true">
      <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="3.5 8.5 6.5 11.5 12.5 4.5" />
      </svg>
    </span>
  );
}

export default function HomePage() {
  return (
    <div id="top" className="site-wrapper">
      <SiteHeader />

      <main id="main-content">
        <section id="hero" className="section hero" aria-labelledby="hero-title">
          <div className="container hero__grid">
            <div className="hero__copy">
              <span className="kicker">
                {siteConfig.author} · {siteConfig.authorRole}
              </span>

              <h1 id="hero-title" className="hero__title">
                It’s not your personality. It’s three locks in your brain.
              </h1>

              <p className="hero__lead">
                Fear that freezes you. Comfort that drains you. Status that makes
                you small in the room. Break all three in 21 days.
              </p>

              <div className="hero__actions">
                <BuyButton className="btn--lg" />
                <a href="#offer" className="btn btn-ghost">
                  See what’s inside
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 16 16"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    width="16"
                    height="16"
                  >
                    <line x1="3" y1="8" x2="13" y2="8" />
                    <polyline points="9 4 13 8 9 12" />
                  </svg>
                </a>
              </div>

              <p className="hero__note">
                Hardcover and field journal included. 60-day refund. Free
                shipping to the US, UK and Europe.
              </p>
            </div>

            <div className="hero__visual">
              <VignetteBloom
                src="/img/ascii-portrait.webp"
                alt="A dancer rendered as a living mosaic of light and shadow."
                config={vignetteBloomPreset}
              />
              <p className="hero__caption">
                <strong>Study 01</strong>
                <span>Live render · 16px mosaic</span>
              </p>
            </div>
          </div>
        </section>

        <section
          id="locks"
          className="section"
          aria-labelledby="locks-title"
        >
          <div className="container">
            <div className="section-head">
              <span className="kicker">The three locks</span>
              <h2 id="locks-title">Stuck on three survival settings.</h2>
              <p>
                Your brain is trying to keep you safe. The trouble is it treats a
                hard conversation like a predator. Each week of the protocol
                targets one setting.
              </p>
            </div>

            <div className="locks">
              {locks.map((lock) => (
                <article key={lock.num} className="lock">
                  <span className="lock__num">{lock.num}</span>
                  <div>
                    <h3 className="lock__name">{lock.name}</h3>
                    <p className="lock__desc">{lock.desc}</p>
                  </div>
                  <p className="lock__meta">
                    <strong>{lock.week}</strong>
                    {lock.result}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section
          id="days"
          className="section section--tight"
          aria-labelledby="days-title"
        >
          <div className="container">
            <div className="section-head">
              <span className="kicker">The sequence</span>
              <h2 id="days-title">Twenty-one days, in order.</h2>
              <p>
                One phase at a time. Day 1 gives you a baseline. Day 21 proves
                what moved.
              </p>
            </div>

            <div className="phases">
              {phases.map((phase) => (
                <div key={phase.name} className="phase">
                  <span className="phase__days">{phase.days}</span>
                  <h3 className="phase__name">{phase.name}</h3>
                  <p className="phase__desc">{phase.desc}</p>
                </div>
              ))}
            </div>

            <p className="days__note">
              <strong>Fifteen to twenty minutes a day.</strong> No gym, no
              gadgets, no willpower speeches. Take your Limitless Score on Day 1,
              then again on Day 21.
            </p>
          </div>
        </section>

        <section
          id="proof"
          className="section section--tint"
          aria-labelledby="proof-title"
        >
          <div className="container">
            <h2 id="proof-title" className="sr-only">
              Reader proof
            </h2>

            <div className="proof">
              <div className="proof__media">
                <Image
                  src="/img/mike.jpg"
                  alt="Mike Sager with his copy of The Limitless Black Book."
                  fill
                  sizes="(min-width: 768px) 38vw, 92vw"
                />
              </div>

              <div>
                <span className="kicker">One reader</span>
                <blockquote className="proof__quote">
                  “I’m 74 and I’m feeling like I’m in my 20s!”
                </blockquote>

                <div className="proof__person">
                  <div className="proof__avatar">
                    <Image
                      src="/img/mike-avatar.jpg"
                      alt=""
                      width={44}
                      height={44}
                    />
                  </div>
                  <div>
                    <strong className="proof__name">Mike Sager</strong>
                    <span className="proof__detail">
                      Verified reader · Age 74
                    </span>
                  </div>
                </div>

                <p className="proof__note">
                  <strong>Individual results.</strong> Your results depend on the
                  work you put in.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section
          id="offer"
          className="section"
          aria-labelledby="offer-title"
        >
          <div className="container">
            <div className="offer">
              <div className="offer__media">
                <Image
                  src="/img/hardcover.jpg"
                  alt="The Limitless Black Book hardcover on a marble stand."
                  fill
                  sizes="(min-width: 1024px) 50vw, 92vw"
                />
              </div>

              <div className="offer__body">
                <span className="kicker">The edition</span>
                <h2 id="offer-title" className="offer__title">
                  The hardcover and the field journal.
                </h2>
                <p className="offer__lead">
                  The full 21-day protocol, printed and bound. The journal comes
                  with it.
                </p>

                <ul className="offer__list">
                  {inclusions.map((item) => (
                    <li key={item}>
                      <CheckIcon />
                      {item}
                    </li>
                  ))}
                </ul>

                <div className="offer__price">
                  <span className="sr-only">Sale price</span>
                  <strong>$97</strong>
                  <s>
                    <span className="sr-only">Regular price</span>$179
                  </s>
                  <span className="offer__save">Save $82</span>
                </div>

                <BuyButton className="btn--lg" />

                <p className="offer__fine">
                  Free shipping to the US, UK and Europe. 60-day refund: do the
                  21 days, and if you don’t feel the difference, email{" "}
                  <a href={`mailto:${siteConfig.email}`} className="link">
                    {siteConfig.email}
                  </a>{" "}
                  and we’ll refund every cent.
                </p>

                <div className="offer__author">
                  <div className="offer__author-avatar">
                    <Image
                      src="/img/farhan.jpg"
                      alt=""
                      width={36}
                      height={36}
                    />
                  </div>
                  <div>
                    <strong>Farhan Khawaja, PhD</strong>
                    <span>Neuroscientist</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section
          id="faq"
          className="section section--tight"
          aria-labelledby="faq-title"
        >
          <div className="container">
            <div className="faq-layout">
              <div className="faq-intro">
                <span className="kicker">Questions</span>
                <h2 id="faq-title">Clear answers.</h2>
                <p>
                  Short answers to the things people ask before they start.
                </p>
              </div>

              <FAQAccordion items={faqs} />
            </div>
          </div>
        </section>

        <section
          id="start"
          className="section section--tight"
          aria-labelledby="start-title"
        >
          <div className="container">
            <div className="cta">
              <h2 id="start-title" className="cta__title">
                Day 1 can be tonight.
              </h2>
              <p className="cta__lead">21 days. About twenty minutes a day.</p>

              <BuyButton variant="inverse" className="btn--lg" />

              <p className="cta__fine">
                Hardcover and field journal included. 60-day refund. Free
                shipping to the US, UK and Europe.
              </p>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
      <StickyBuyBar checkoutUrl={siteConfig.checkoutUrl} />
    </div>
  );
}
