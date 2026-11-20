import Image from "next/image";
import { BuyButton } from "@/components/buy-button";
import { DiagnosticMatrix } from "@/components/diagnostic-matrix";
import { FAQAccordion } from "@/components/faq-accordion";
import { NeuralLocksConsole } from "@/components/neural-locks-console";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { StickyBuyBar } from "@/components/sticky-buy-bar";
import { testimonials } from "@/data/testimonials";
import { siteConfig } from "@/lib/site";

const chapters = [
  {
    num: "01",
    title: "Factory settings",
    desc: "Understanding the ancient biological survival mechanisms that control daily behavior.",
    image: "/img/factory.jpg",
  },
  {
    num: "02",
    title: "The 48-Hour Key",
    desc: "The critical catalyst: executing one undeniable physical action to break inertia.",
    image: "/img/key.jpg",
  },
  {
    num: "03",
    title: "The Fear lock",
    desc: "Regulating the amygdala alarm and dismantling physiological hesitation.",
    image: "/img/fear.jpg",
  },
  {
    num: "04",
    title: "The Comfort lock",
    desc: "Rewiring the dopamine loop to eliminate passive digital avoidance.",
    image: "/img/comfort.jpg",
  },
  {
    num: "05",
    title: "The Status lock",
    desc: "Recalibrating subconscious social hierarchy and command over the room.",
    image: "/img/status.jpg",
  },
  {
    num: "06",
    title: "The Limitless Routine",
    desc: "The daily 15–20 minute neuro-kinetic maintenance protocol.",
    image: "/img/routine.jpg",
  },
];

const days = [
  {
    label: "Day 1",
    title: "Take your Limitless Score and make the 48-hour move.",
    body: "Your starting point, then one real action within two days.",
    image: "/img/day-1.jpg",
    alt: "A single figure at the start of the 21-day protocol.",
    badge: "Diagnostic Baseline",
  },
  {
    label: "Days 1–7",
    title: "Fear",
    body: "Stop flinching. Settle the alarm and act anyway.",
    image: "/img/week-1.jpg",
    alt: "Week one — the fear lock.",
    badge: "Phase 01: Amygdala Reset",
  },
  {
    label: "Days 8–14",
    title: "Comfort",
    body: "Break the loop. Make hard things feel less heavy.",
    image: "/img/week-2.jpg",
    alt: "Week two — the comfort lock.",
    badge: "Phase 02: Dopamine Loop",
  },
  {
    label: "Days 15–21",
    title: "Status",
    body: "Own the room. Change the signals you send.",
    image: "/img/week-3.jpg",
    alt: "Week three — the status lock.",
    badge: "Phase 03: Social Dominance",
  },
  {
    label: "Day 21",
    title: "Retake your Limitless Score.",
    body: "Compare where you started with where you are.",
    image: "/img/day-1.jpg",
    alt: "The end of the protocol and the retaken score.",
    badge: "Objective Verification",
  },
];

const faqs = [
  {
    question: "Is it too late in my 50s?",
    answer:
      "No. The brain keeps changing with practice. That’s called neuroplasticity.",
  },
  {
    question: "How much time per day?",
    answer: "15 to 20 minutes.",
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

const comparisonRows = [
  {
    ours: "One lock a week, in a fixed order.",
    theirs: "A pile of ideas, taken in any order.",
  },
  {
    ours: "A score on day 1, retaken on day 21.",
    theirs: "No start line, no finish line.",
  },
  {
    ours: "15 to 20 minutes of practice a day.",
    theirs: "Hours of reading, little practice.",
  },
  {
    ours: "Protocols for the two minutes before you act.",
    theirs: "Advice for after it goes wrong.",
  },
  {
    ours: "Three settings: fear, comfort, status.",
    theirs: "A new framework every season.",
  },
  {
    ours: "A 60-day refund, stated plainly.",
    theirs: "Terms that vary by publisher.",
  },
];

const readerMedia = [
  {
    photo: "/img/mike.jpg",
    avatar: "/img/mike-avatar.jpg",
    photoAlt: "Mike Sager with his copy of The Limitless Black Book.",
    verified: "Verified Reader &bull; Age 74",
  },
  {
    photo: "/img/zander.jpg",
    avatar: "/img/zander-avatar.jpg",
    photoAlt: "Zander P. holding The Limitless Black Book.",
    verified: "Verified Reader &bull; Executive Consultant",
  },
  {
    photo: null,
    avatar: null,
    photoAlt: "",
    verified: "Verified Reader &bull; Trustpilot Review",
  },
];

export default function HomePage() {
  return (
    <div id="top" className="site-wrapper">
      <SiteHeader />

      <main id="main-content">
        {/* HERO SECTION */}
        <section id="hero" className="hero" aria-labelledby="hero-title">
          {/* Background atmosphere */}
          <div className="hero__backdrop" aria-hidden="true">
            <Image
              src="/img/hero-brain.jpg"
              alt=""
              fill
              priority
              sizes="100vw"
              className="object-cover hero__backdrop-img"
            />
            <div className="hero__overlay" />
            <div className="hero__radial" />
          </div>

          <div className="container-page hero__container">
            <div className="hero__grid">
              {/* Left Column: Authoritative Editorial Copy */}
              <div className="hero__content">
                <div className="hero__badge">
                  <span className="hero__badge-dot" aria-hidden="true" />
                  <span>{siteConfig.author}</span>
                  <span className="hero__badge-sep">&bull;</span>
                  <span>{siteConfig.authorRole}</span>
                  <span className="hero__badge-sep">&bull;</span>
                  <span>21-Day Neuroscience Protocol</span>
                </div>

                <h1 id="hero-title" className="hero__heading">
                  It’s not your personality. <br />
                  <span className="hero__heading-accent">
                    It’s three locks in your brain.
                  </span>
                </h1>

                <p className="hero__lead">
                  Fear that freezes you. Comfort that drains you. A brain that
                  ranks you low before you speak. Break all three in 21 days.
                </p>

                <div className="hero__actions">
                  <BuyButton className="btn--lg">
                    Get the hardcover, $97
                  </BuyButton>
                  <a href="#letter" className="hero__secondary-link">
                    Read the author’s letter
                    <svg
                      aria-hidden="true"
                      viewBox="0 0 16 16"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      className="hero__link-arrow"
                    >
                      <line x1="3" y1="8" x2="13" y2="8" />
                      <polyline points="9 4 13 8 9 12" />
                    </svg>
                  </a>
                </div>

                {/* Key Inclusions Strip */}
                <div className="hero__facts">
                  <div className="hero__fact">
                    <span className="hero__fact-label">Physical Edition</span>
                    <strong className="hero__fact-value">Hardcover + journal</strong>
                    <span className="hero__fact-sub">Included with every order.</span>
                  </div>

                  <div className="hero__fact-divider" aria-hidden="true" />

                  <div className="hero__fact">
                    <span className="hero__fact-label">Daily Commitment</span>
                    <strong className="hero__fact-value">15–20 min / day</strong>
                    <span className="hero__fact-sub">Three weeks, in fixed order.</span>
                  </div>

                  <div className="hero__fact-divider" aria-hidden="true" />

                  <div className="hero__fact">
                    <span className="hero__fact-label">Risk Reversal</span>
                    <strong className="hero__fact-value">60-day refund</strong>
                    <span className="hero__fact-sub">Stated plainly. No forms.</span>
                  </div>
                </div>
              </div>

              {/* Right Column: Physical Hardcover Presentation */}
              <div className="hero__visual">
                <div className="hero-book-stage">
                  <div className="hero-book-card">
                    <div className="hero-book-frame">
                      <Image
                        src="/img/cover.jpg"
                        alt="The Limitless Black Book physical hardcover edition by Farhan Khawaja, PhD."
                        width={600}
                        height={900}
                        priority
                        className="object-cover hero-book-img"
                      />
                    </div>
                    <div className="hero-book-card__footer">
                      <div className="hero-book-card__title">
                        <strong>The Hardcover Edition</strong>
                        <span>Archival Cloth Bound &bull; Debossed Gold Foil</span>
                      </div>
                      <span className="hero-book-card__price">$97</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* STATEMENT BAND */}
        <section className="monograph-band" aria-label="Core Premise">
          <div className="container-page monograph-band__inner">
            <span className="monograph-band__line" aria-hidden="true" />
            <p className="monograph-band__primary">
              Three locks. Three weeks. About twenty minutes a day.
            </p>
            <p className="monograph-band__secondary">
              No gym, no gadgets, no willpower speeches.
            </p>
            <span className="monograph-band__line" aria-hidden="true" />
          </div>
        </section>

        {/* THE LETTER SECTION */}
        <section
          id="letter"
          className="section section--letter"
          aria-labelledby="letter-title"
        >
          <div className="container-page letter-spread">
            {/* Aside: Author Authority */}
            <aside className="letter-spread__aside">
              <div className="letter-aside-sticky">
                <span className="eyebrow">A Letter from Farhan</span>
                <h2 id="letter-title" className="letter-spread__heading">
                  Two men. <br />
                  Same start. <br />
                  Very different lives.
                </h2>
                <p className="letter-spread__sub">
                  The clinical premise of the book, in the author’s own words.
                </p>

                <div className="letter-author-card">
                  <div className="letter-author-avatar">
                    <Image
                      src="/img/farhan.jpg"
                      alt="Farhan Khawaja, PhD"
                      width={80}
                      height={80}
                      className="object-cover"
                    />
                  </div>
                  <div className="letter-author-meta">
                    <strong>Farhan Khawaja, PhD</strong>
                    <span>Neuroscientist & Author</span>
                  </div>
                </div>
              </div>
            </aside>

            {/* Main Letter Body */}
            <div className="letter-spread__body">
              <div className="letter-paper">
                <p className="letter-lead">
                  Let me tell you about two men. One of them may sound a lot like
                  you. They finished school in the same year. Both were bright.
                  Both worked hard. Both had big plans.
                </p>

                <p>
                  Twenty-five years later, one of them is still waiting for
                  permission. He sits on his ideas, talks himself out of the
                  raise, and goes home wondering why his life turned out smaller
                  than he planned.
                </p>

                <p>
                  The other one runs the room. He makes the call, asks for what he
                  wants, and gets it. Same start. Same talent. Same twenty-four
                  hours in a day. Very different lives.
                </p>

                <blockquote className="letter-pullquote">
                  <p>
                    “The difference lies in what each man knew about his own
                    brain, and what he did with that knowledge.”
                  </p>
                  <cite>&mdash; From the letter</cite>
                </blockquote>

                <p>
                  Your brain still runs on three old survival settings: Fear, a
                  threat alarm built for predators that now fires before every
                  hard conversation. Comfort, a dopamine loop that rewards the
                  scroll, the snack and ‘I’ll do it tomorrow.’ Status, a ranking
                  system that decides, within seconds, how much space you are
                  allowed to take in a room.
                </p>

                <p>
                  Three locks, three weeks, about twenty minutes a day. No gym, no
                  gadgets, no willpower speeches.
                </p>

                <div className="letter-footer">
                  <p className="letter-question">
                    Twenty-five years from now, which of those two men do you want
                    to be?
                  </p>
                  <p className="letter-signoff">
                    Farhan Khawaja, PhD <br />
                    <span>Neuroscientist</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* THREE LOCKS SECTION (HERO MOVE: NEURAL PROTOCOL CONSOLE) */}
        <section
          id="locks"
          className="section section--locks"
          aria-labelledby="locks-title"
        >
          <div className="container-page">
            <div className="section-intro">
              <span className="eyebrow">Neurological Architecture</span>
              <h2 id="locks-title" className="section-title">
                Three locks. Three weeks.
              </h2>
              <p className="section-desc">
                About twenty minutes a day. No gym, no gadgets, no willpower
                speeches. Each week targets one primal survival setting with
                protocols for the two minutes before you act.
              </p>
            </div>

            <NeuralLocksConsole />
          </div>
        </section>

        {/* 21 DAYS TIMELINE SECTION */}
        <section
          id="days"
          className="section section--days"
          aria-labelledby="days-title"
        >
          <div className="container-page">
            <div className="section-intro">
              <span className="eyebrow">The Sequential Regimen</span>
              <h2 id="days-title" className="section-title">The 21 days</h2>
              <p className="section-desc">
                One sequence, strictly in order. Day 1 gives you a clinical baseline.
                Day 21 proves what moved.
              </p>
            </div>

            <div className="timeline-grid">
              {days.map((day, index) => (
                <div key={day.label} className="timeline-card">
                  <div className="timeline-card__media">
                    <Image
                      src={day.image}
                      alt={day.alt}
                      fill
                      sizes="(min-width: 1024px) 240px, 92vw"
                      className="object-cover"
                    />
                    <span className="timeline-card__badge">{day.badge}</span>
                  </div>

                  <div className="timeline-card__content">
                    <div className="timeline-card__step-header">
                      <span className="timeline-card__step-num">
                        Step 0{index + 1}
                      </span>
                      <strong className="timeline-card__step-label">
                        {day.label}
                      </strong>
                    </div>

                    <h3 className="timeline-card__step-title">{day.title}</h3>
                    <p className="timeline-card__step-body">{day.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* INSIDE THE BOOK (CHAPTER ARCHIVE) */}
        <section
          id="inside"
          className="section section--inside"
          aria-labelledby="inside-title"
        >
          <div className="container-page">
            <div className="section-intro">
              <span className="eyebrow">Curriculum Dossier</span>
              <h2 id="inside-title" className="section-title">
                Inside the book
              </h2>
              <p className="section-desc">Six chapters. Read in order.</p>
            </div>

            <div className="chapters-grid">
              {chapters.map((chapter) => (
                <article key={chapter.num} className="chapter-card">
                  <div className="chapter-card__thumb">
                    <Image
                      src={chapter.image}
                      alt={`Chapter ${chapter.num}: ${chapter.title}`}
                      fill
                      sizes="160px"
                      className="object-cover"
                    />
                  </div>

                  <div className="chapter-card__body">
                    <span className="chapter-card__num">{chapter.num}</span>
                    <h3 className="chapter-card__title">{chapter.title}</h3>
                    <p className="chapter-card__desc">{chapter.desc}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ABOUT THE AUTHOR SECTION */}
        <section
          id="author"
          className="section section--author"
          aria-labelledby="author-title"
        >
          <div className="container-page">
            <div className="author-layout">
              {/* Author Portrait */}
              <div className="author-portrait-wrap">
                <div className="author-portrait-frame">
                  <Image
                    src="/img/farhan.jpg"
                    alt="Farhan Khawaja, PhD, neuroscientist and author of The Limitless Black Book."
                    fill
                    sizes="(min-width: 1024px) 440px, 92vw"
                    className="object-cover"
                  />
                  <div className="author-portrait-badge">
                    <span>Farhan Khawaja, PhD &bull; Neuroscientist</span>
                  </div>
                </div>
              </div>

              {/* Author Biography & Philosophy */}
              <div className="author-bio">
                <span className="eyebrow">Academic Credential</span>
                <h2 id="author-title" className="author-bio__name">
                  Farhan Khawaja, PhD
                </h2>
                <p className="author-bio__role">
                  Neuroscientist &bull; Behavioral Protocol Designer
                </p>

                <div className="author-bio__specs">
                  <div className="author-spec-item">
                    <span className="author-spec-label">Scientific Discipline</span>
                    <strong className="author-spec-value">Neuroscience</strong>
                  </div>
                  <div className="author-spec-item">
                    <span className="author-spec-label">Academic Degree</span>
                    <strong className="author-spec-value">PhD</strong>
                  </div>
                  <div className="author-spec-item">
                    <span className="author-spec-label">Core Publication</span>
                    <strong className="author-spec-value">The Limitless Black Book</strong>
                  </div>
                </div>

                <blockquote className="author-quote-box">
                  <p>
                    “Three locks, three weeks, about twenty minutes a day. No gym,
                    no gadgets, no willpower speeches.”
                  </p>
                  <footer>&mdash; Farhan Khawaja, PhD</footer>
                </blockquote>
              </div>
            </div>
          </div>
        </section>

        {/* TESTIMONIALS & READER EVIDENCE */}
        <section
          id="proof"
          className="section section--proof"
          aria-labelledby="proof-title"
        >
          <div className="container-page">
            <div className="section-intro">
              <span className="eyebrow">Reader Evidence</span>
              <h2 id="proof-title" className="section-title">
                What readers say
              </h2>
              <p className="section-desc">Three readers, in their own words.</p>
            </div>

            <div className="proof-grid">
              {testimonials.map((testimonial, idx) => {
                const media = readerMedia[idx];
                return (
                  <div key={testimonial.name} className="proof-card">
                    {media.photo ? (
                      <div className="proof-card__media">
                        <Image
                          src={media.photo}
                          alt={media.photoAlt}
                          fill
                          sizes="(min-width: 900px) 360px, 92vw"
                          className="object-cover"
                        />
                      </div>
                    ) : (
                      <div className="proof-card__media-placeholder">
                        <div className="proof-card__trustpilot-badge">
                          Verified Review
                        </div>
                      </div>
                    )}

                    <div className="proof-card__body">
                      <blockquote className="proof-card__quote">
                        “{testimonial.quote}”
                      </blockquote>

                      <div className="proof-card__person">
                        {media.avatar ? (
                          <div className="proof-card__avatar">
                            <Image
                              src={media.avatar}
                              alt=""
                              width={44}
                              height={44}
                              className="object-cover"
                            />
                          </div>
                        ) : (
                          <div className="proof-card__avatar-init">
                            MG
                          </div>
                        )}
                        <div>
                          <strong className="proof-card__name">
                            {testimonial.name}
                          </strong>
                          <span className="proof-card__detail">
                            {testimonial.detail}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Community Gallery Strip */}
            <div className="community-strip">
              <div className="community-strip__header">
                <span className="community-strip__badge">Private Readers Circle</span>
                <p>Direct peer support & protocol execution across the 21 days.</p>
              </div>
              <div className="community-strip__images">
                <div className="community-strip__img-frame">
                  <Image
                    src="/img/group-1.jpg"
                    alt="Readers in discussion group"
                    fill
                    sizes="300px"
                    className="object-cover"
                  />
                </div>
                <div className="community-strip__img-frame">
                  <Image
                    src="/img/group-2.jpg"
                    alt="Readers sharing protocol notes"
                    fill
                    sizes="300px"
                    className="object-cover"
                  />
                </div>
                <div className="community-strip__img-frame">
                  <Image
                    src="/img/group-3.jpg"
                    alt="Community members interacting"
                    fill
                    sizes="300px"
                    className="object-cover"
                  />
                </div>
              </div>
            </div>

            <p className="disclaimer-note">
              Individual results. Your results depend on the work you put in.
            </p>
          </div>
        </section>

        {/* DIAGNOSTIC COMPARISON SECTION */}
        <section
          id="comparison"
          className="section section--comparison"
          aria-labelledby="comparison-title"
        >
          <div className="container-page">
            <div className="section-intro">
              <span className="eyebrow">Diagnostic Evaluation</span>
              <h2 id="comparison-title" className="section-title">
                How it compares
              </h2>
              <p className="section-desc">
                The fundamental distinction lies in structure and active practice.
              </p>
            </div>

            <DiagnosticMatrix rows={comparisonRows} />
          </div>
        </section>

        {/* THE OFFER / UNBOXING SECTION */}
        <section
          id="offer"
          className="section section--offer"
          aria-labelledby="offer-title"
        >
          <div className="container-page">
            <div className="offer-showcase">
              {/* Product Visual Left */}
              <div className="offer-showcase__media">
                <div className="offer-showcase__badge">
                  Hardcover Edition + Field Journal
                </div>
                <div className="offer-showcase__img-wrap">
                  <Image
                    src="/img/book-and-journal.jpg"
                    alt="The Limitless Black Book hardcover beside the black field journal."
                    width={1200}
                    height={800}
                    className="object-cover offer-showcase__img"
                  />
                </div>
              </div>

              {/* Offer Details Right */}
              <div className="offer-showcase__details">
                <span className="eyebrow">Physical Package</span>
                <h2 id="offer-title" className="offer-showcase__title">
                  The Edition
                </h2>
                <p className="offer-showcase__lead">
                  The full 21-day protocol, printed and archival bound. The field
                  journal comes with it.
                </p>

                <div className="offer-inclusions">
                  <div className="offer-inclusion-item">
                    <span className="offer-inclusion-check" aria-hidden="true">
                      <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: 12, height: 12 }}>
                        <polyline points="3.5 8.5 6.5 11.5 12.5 4.5" />
                      </svg>
                    </span>
                    <div>
                      <strong>The Hardcover</strong>
                      <p>The full 21-day protocol, printed and bound.</p>
                    </div>
                  </div>

                  <div className="offer-inclusion-item">
                    <span className="offer-inclusion-check" aria-hidden="true">
                      <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: 12, height: 12 }}>
                        <polyline points="3.5 8.5 6.5 11.5 12.5 4.5" />
                      </svg>
                    </span>
                    <div>
                      <strong>The Field Journal</strong>
                      <p>Free with every order.</p>
                    </div>
                  </div>

                  <div className="offer-inclusion-item">
                    <span className="offer-inclusion-check" aria-hidden="true">
                      <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: 12, height: 12 }}>
                        <polyline points="3.5 8.5 6.5 11.5 12.5 4.5" />
                      </svg>
                    </span>
                    <div>
                      <strong>Private Members Group</strong>
                      <p>For readers of the book.</p>
                    </div>
                  </div>
                </div>

                <div className="offer-pricing-box">
                  <div className="offer-pricing-row">
                    <span className="sr-only">Sale price </span>
                    <strong className="offer-price-active">$97</strong>
                    <s className="offer-price-strike">
                      <span className="sr-only">Regular price </span>$179
                    </s>
                    <span className="offer-save-tag">Save $82 &bull; 46% Off</span>
                  </div>
                  <BuyButton className="btn--lg w-full justify-center">
                    Get the hardcover, $97
                  </BuyButton>
                </div>

                <div className="offer-guarantee-seal">
                  <div className="offer-guarantee-icon" aria-hidden="true">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                    </svg>
                  </div>
                  <p className="offer-fine-print">
                    Free shipping to the US, UK and Europe. 60-day refund. Do
                    the 21 days. If you don’t feel the difference, email{" "}
                    <a href={`mailto:${siteConfig.email}`} className="link">
                      {siteConfig.email}
                    </a>{" "}
                    within 60 days of your order and we’ll refund every cent.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ SECTION */}
        <section
          id="faq"
          className="section section--faq"
          aria-labelledby="faq-title"
        >
          <div className="container-page faq-spread">
            <div className="faq-spread__aside">
              <span className="eyebrow">Clear Answers</span>
              <h2 id="faq-title" className="faq-spread__title">
                Questions and answers
              </h2>
              <p className="faq-spread__lead">
                Short, unambiguous answers to the things people ask before they start.
              </p>
            </div>

            <div className="faq-spread__content">
              <FAQAccordion items={faqs} />
            </div>
          </div>
        </section>

        {/* FINALE SECTION */}
        <section
          id="start"
          className="section-finale"
          aria-labelledby="start-title"
        >
          <div className="section-finale__bg" aria-hidden="true">
            <Image
              src="/img/door.jpg"
              alt=""
              fill
              sizes="100vw"
              className="object-cover section-finale__bg-img"
            />
            <div className="section-finale__veil" />
          </div>

          <div className="container-page section-finale__container">
            <div className="section-finale__card">
              <span className="eyebrow justify-center">The Threshold</span>
              <h2 id="start-title" className="section-finale__heading">
                Start Day 1 tonight.
              </h2>
              <p className="section-finale__lead">
                21 days. About twenty minutes a day.
              </p>

              <div className="section-finale__actions">
                <BuyButton className="btn--lg">
                  Get the hardcover, $97
                </BuyButton>
                <a href="#offer" className="hero__secondary-link">
                  See what’s inside
                </a>
              </div>

              <p className="section-finale__terms">
                Hardcover and field journal included. 60-day refund. Free shipping
                to the US, UK and Europe.
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
