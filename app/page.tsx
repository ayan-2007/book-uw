import { BuyButton } from "@/components/buy-button";
import { LocksScroller } from "@/components/locks-scroller";
import { Media } from "@/components/media";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { StickyBuyBar } from "@/components/sticky-buy-bar";
import { locks } from "@/data/locks";
import { testimonials } from "@/data/testimonials";
import { images } from "@/lib/images";
import { siteConfig } from "@/lib/site";

const chapters = [
  {
    title: "Factory settings",
    image: images.heroBrain,
    position: "object-[50%_42%]",
  },
  {
    title: "The 48-Hour Key",
    image: images.key,
    position: "object-center",
  },
  {
    title: "The Fear lock",
    image: images.fear,
    position: "object-[50%_40%]",
  },
  {
    title: "The Comfort lock",
    image: images.comfort,
    position: "object-[50%_40%]",
  },
  {
    title: "The Status lock",
    image: images.status,
    position: "object-[50%_40%]",
  },
  {
    title: "The Limitless Routine",
    image: images.door,
    position: "object-[72%_50%]",
  },
];

const days = [
  {
    label: "Day 1",
    title: "Take your Limitless Score and make the 48-hour move.",
    body: "Your starting point, then one real action within two days.",
  },
  {
    label: "Days 1–7",
    title: "Fear",
    body: "Stop flinching. Settle the alarm and act anyway.",
  },
  {
    label: "Days 8–14",
    title: "Comfort",
    body: "Break the loop. Make hard things feel less heavy.",
  },
  {
    label: "Days 15–21",
    title: "Status",
    body: "Own the room. Change the signals you send.",
  },
  {
    label: "Day 21",
    title: "Retake your Limitless Score.",
    body: "Compare where you started with where you are.",
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

export default function HomePage() {
  const lockVisuals = locks.map((lock) => (
    <Media
      key={lock.id}
      src={lock.image.src}
      alt={lock.image.alt}
      width={lock.image.width}
      height={lock.image.height}
      className="h-full w-full"
      imageClassName="object-[50%_40%]"
      sizes="(min-width: 1024px) 40vw, 1px"
    />
  ));

  const lockInlineVisuals = locks.map((lock) => (
    <Media
      key={lock.id}
      src={lock.image.src}
      alt={lock.image.alt}
      width={lock.image.width}
      height={lock.image.height}
      className="aspect-[4/3] w-full"
      imageClassName="object-[50%_40%]"
      sizes="(min-width: 1024px) 1px, 92vw"
    />
  ));

  return (
    <div id="top">
      <SiteHeader />

      <main id="main-content">
        <section
          id="hero"
          aria-labelledby="hero-title"
          className="container-page pb-16 pt-8 md:pb-24 md:pt-16"
        >
          <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-7">
              <p className="hero-reveal hero-reveal-1 font-sans text-base text-slate">
                {siteConfig.author}, neuroscientist
              </p>
              <h1
                id="hero-title"
                className="hero-reveal hero-reveal-2 mt-4 max-w-[13ch] font-serif text-4xl text-paper"
              >
                It’s not your personality. It’s three locks in your brain.
              </h1>
              <p className="hero-reveal hero-reveal-3 mt-6 max-w-[52ch] font-sans text-lg text-paper">
                Fear that freezes you. Comfort that drains you. A brain that
                ranks you low before you speak. Break all three in 21 days.
              </p>
              <div className="hero-reveal hero-reveal-4 mt-8">
                <BuyButton />
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="mx-auto w-full max-w-sm lg:mx-0 lg:ml-auto">
                <Media
                  src={images.hardcover.src}
                  alt={images.hardcover.alt}
                  width={images.hardcover.width}
                  height={images.hardcover.height}
                  className="aspect-[4/5] w-full"
                  imageClassName="object-[50%_45%]"
                  sizes="(min-width: 1024px) 32vw, (min-width: 768px) 48vw, 90vw"
                  priority
                />
                <p className="mt-3 font-sans text-base text-slate">
                  Hardcover book. A 21-day protocol.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section
          id="letter"
          aria-labelledby="letter-title"
          className="border-y border-line bg-surface"
        >
          <div className="container-page py-16 md:py-32">
            <div className="max-w-letter">
              <h2
                id="letter-title"
                className="font-serif text-3xl text-paper"
              >
                Two men. Same start. Very different lives.
              </h2>

              <div className="mt-8 space-y-6 font-serif text-lg leading-[1.7] text-paper">
                <p className="text-xl leading-[1.6]">
                  Let me tell you about two men. One of them may sound a lot
                  like you. They finished school in the same year. Both were
                  bright. Both worked hard. Both had big plans.
                </p>
                <p>
                  Twenty-five years later, one of them is still waiting for
                  permission. He sits on his ideas, talks himself out of the
                  raise, and goes home wondering why his life turned out
                  smaller than he planned.
                </p>
                <p>
                  The other one runs the room. He makes the call, asks for what
                  he wants, and gets it. Same start. Same talent. Same
                  twenty-four hours in a day. Very different lives.
                </p>
                <p>
                  The difference lies in what each man knew about his own
                  brain, and what he did with that knowledge.
                </p>
                <p>
                  Your brain still runs on three old survival settings: Fear, a
                  threat alarm built for predators that now fires before every
                  hard conversation. Comfort, a dopamine loop that rewards the
                  scroll, the snack and ‘I’ll do it tomorrow.’ Status, a
                  ranking system that decides, within seconds, how much space
                  you are allowed to take in a room.
                </p>
                <p>
                  Three locks, three weeks, about twenty minutes a day. No gym,
                  no gadgets, no willpower speeches.
                </p>
                <p>
                  Twenty-five years from now, which of those two men do you
                  want to be?
                </p>
              </div>

              <p className="mt-8 border-t border-line pt-6 font-serif text-lg text-paper">
                Farhan Khawaja, PhD, neuroscientist
              </p>
            </div>
          </div>
        </section>

        <section
          id="three-locks"
          aria-labelledby="locks-title"
          className="container-page py-16 md:py-24"
        >
          <div className="max-w-[62ch]">
            <h2 id="locks-title" className="font-serif text-3xl text-paper">
              Three locks. Three weeks.
            </h2>
            <p className="mt-4 font-sans text-lg text-slate">
              About twenty minutes a day. No gym, no gadgets, no willpower
              speeches.
            </p>
          </div>

          <LocksScroller
            visuals={lockVisuals}
            inlineVisuals={lockInlineVisuals}
          />
        </section>

        <section
          id="twenty-one-days"
          aria-labelledby="days-title"
          className="border-y border-line"
        >
          <div className="container-page py-16 md:py-24">
            <div className="lg:grid lg:grid-cols-12 lg:gap-16">
              <div className="lg:col-span-4">
                <h2 id="days-title" className="font-serif text-3xl text-paper">
                  The 21 days
                </h2>
                <p className="mt-4 font-sans text-lg text-slate">
                  One sequence, in order. About twenty minutes a day.
                </p>
                <p className="mt-3 font-sans text-base text-slate">
                  Day 1 gives you a baseline. Day 21 shows you what moved.
                </p>
              </div>

              <div className="mt-12 lg:col-span-7 lg:col-start-6 lg:mt-0">
                <ol className="ml-4 border-l border-line">
                  {days.map((day, index) => (
                    <li
                      key={day.label}
                      className="relative pb-12 pl-8 last:pb-0"
                    >
                      <span
                        aria-hidden="true"
                        className="absolute -left-4 top-0 flex h-8 w-8 items-center justify-center rounded-sm border border-line bg-surface font-serif text-base tabular-nums text-paper"
                      >
                        {index + 1}
                      </span>
                      <p className="font-sans text-base text-slate">
                        {day.label}
                      </p>
                      <h3 className="mt-2 font-serif text-xl text-paper">
                        {day.title}
                      </h3>
                      <p className="mt-2 font-sans text-base text-paper">
                        {day.body}
                      </p>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
        </section>

        <section
          id="inside"
          aria-labelledby="inside-title"
          className="container-page defer-render py-16 md:py-24"
        >
          <div className="lg:grid lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-4">
              <h2 id="inside-title" className="font-serif text-3xl text-paper">
                Inside the book
              </h2>
              <p className="mt-4 font-sans text-lg text-slate">
                Six chapters. Read in order.
              </p>
            </div>

            <div className="mt-12 lg:col-span-7 lg:col-start-6 lg:mt-0">
              <ol className="border-t border-line">
                {chapters.map((chapter, index) => (
                  <li key={chapter.title} className="border-b border-line">
                    <div className="flex items-center gap-6 py-4">
                      <Media
                        src={chapter.image.src}
                        alt={chapter.image.alt}
                        width={chapter.image.width}
                        height={chapter.image.height}
                        className="aspect-[4/3] w-24 shrink-0"
                        imageClassName={chapter.position}
                        sizes="96px"
                      />
                      <div className="min-w-0">
                        <p className="font-sans text-base text-slate">
                          Chapter {index + 1}
                        </p>
                        <h3 className="mt-1 font-serif text-xl text-paper">
                          {chapter.title}
                        </h3>
                      </div>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        <section
          id="author"
          aria-labelledby="author-title"
          className="defer-render border-t border-line"
        >
          <div className="container-page py-16 md:py-32">
            <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
              <div className="lg:col-span-5">
                <Media
                  src={images.farhan.src}
                  alt={images.farhan.alt}
                  width={images.farhan.width}
                  height={images.farhan.height}
                  className="aspect-[4/5] w-full max-w-sm"
                  imageClassName="object-[50%_30%]"
                  sizes="(min-width: 1024px) 32vw, (min-width: 768px) 48vw, 90vw"
                />
              </div>

              <div className="lg:col-span-6 lg:col-start-7">
                <h2
                  id="author-title"
                  className="font-serif text-3xl text-paper"
                >
                  About the author
                </h2>
                <p className="mt-4 font-serif text-xl text-paper">
                  Farhan Khawaja, PhD
                </p>

                <ul className="mt-8 divide-y divide-line border-y border-line">
                  <li className="py-3 font-sans text-lg text-paper">
                    Neuroscientist
                  </li>
                  <li className="py-3 font-sans text-lg text-paper">
                    PhD, neuroscience
                  </li>
                  <li className="py-3 font-sans text-lg text-paper">
                    Author of The Limitless Black Book
                  </li>
                </ul>

                <blockquote className="mt-8 max-w-[48ch] font-serif text-xl leading-[1.5] text-paper">
                  “Three locks, three weeks, about twenty minutes a day. No gym,
                  no gadgets, no willpower speeches.”
                </blockquote>
              </div>
            </div>
          </div>
        </section>

        <section
          id="proof"
          aria-labelledby="proof-title"
          className="defer-render border-t border-line"
        >
          <div className="container-page py-16 md:py-24">
            <h2 id="proof-title" className="font-serif text-3xl text-paper">
              What readers say
            </h2>

            <div className="mt-12 max-w-3xl border-t border-line">
              {testimonials.map((testimonial) => (
                <figure
                  key={testimonial.name}
                  className="border-b border-line py-8"
                >
                  <blockquote className="max-w-[52ch] font-serif text-xl leading-[1.5] text-paper">
                    “{testimonial.quote}”
                  </blockquote>
                  <figcaption className="mt-4 font-sans text-base text-slate">
                    <span className="text-paper">{testimonial.name}</span>,{" "}
                    {testimonial.detail}
                  </figcaption>
                </figure>
              ))}
            </div>

            <p className="mt-8 border-t border-line pt-6 font-sans text-base text-paper">
              Individual results. Your results depend on the work you put in.
            </p>
          </div>
        </section>

        <section
          id="comparison"
          aria-labelledby="comparison-title"
          className="defer-render border-y border-line"
        >
          <div className="container-page py-16 md:py-24">
            <div className="lg:grid lg:grid-cols-12 lg:gap-16">
              <div className="lg:col-span-4">
                <h2
                  id="comparison-title"
                  className="font-serif text-3xl text-paper"
                >
                  How it compares
                </h2>
                <p className="mt-4 font-sans text-lg text-slate">
                  The difference is in structure and practice.
                </p>
              </div>

              <div className="mt-12 overflow-x-auto lg:col-span-7 lg:col-start-6 lg:mt-0">
                <table className="w-full table-fixed border-collapse text-left">
                  <caption className="sr-only">
                    A comparison of The Limitless Black Book and most self-help
                    books
                  </caption>
                  <thead>
                    <tr className="border-y border-line">
                      <th
                        scope="col"
                        className="w-1/2 py-4 pr-4 font-sans text-base font-semibold text-paper"
                      >
                        This book
                      </th>
                      <th
                        scope="col"
                        className="w-1/2 py-4 pl-4 font-sans text-base font-semibold text-slate"
                      >
                        Most self-help books
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {comparisonRows.map((row) => (
                      <tr
                        key={row.ours}
                        className="border-b border-line align-top"
                      >
                        <td className="py-4 pr-4 font-sans text-base text-paper lg:text-lg">
                          {row.ours}
                        </td>
                        <td className="py-4 pl-4 font-sans text-base text-slate lg:text-lg">
                          {row.theirs}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        <section
          id="offer"
          aria-labelledby="offer-title"
          className="defer-render container-page py-16 md:py-32"
        >
          <div className="border border-line bg-surface">
            <div className="grid lg:grid-cols-12">
              <div className="flex items-center justify-center border-b border-line p-6 md:p-8 lg:col-span-5 lg:border-b-0 lg:border-r lg:p-12">
                <Media
                  src={images.cover.src}
                  alt={images.cover.alt}
                  width={images.cover.width}
                  height={images.cover.height}
                  className="aspect-[4/5] w-full max-w-sm"
                  imageClassName="object-[50%_42%]"
                  sizes="(min-width: 1024px) 34vw, (min-width: 768px) 50vw, 90vw"
                />
              </div>

              <div className="p-6 md:p-8 lg:col-span-7 lg:p-12">
                <h2
                  id="offer-title"
                  className="font-serif text-3xl text-paper"
                >
                  What you get
                </h2>

                <ul className="mt-8 border-t border-line">
                  <li className="border-b border-line py-4">
                    <p className="font-serif text-xl text-paper">
                      The hardcover
                    </p>
                    <p className="mt-1 font-sans text-base text-slate">
                      The full 21-day protocol, printed and bound.
                    </p>
                  </li>
                  <li className="border-b border-line py-4">
                    <p className="font-serif text-xl text-paper">
                      The field journal
                    </p>
                    <p className="mt-1 font-sans text-base text-slate">
                      Free with every order.
                    </p>
                  </li>
                  <li className="border-b border-line py-4">
                    <p className="font-serif text-xl text-paper">
                      Private members group
                    </p>
                    <p className="mt-1 font-sans text-base text-slate">
                      For readers of the book.
                    </p>
                  </li>
                </ul>

                <div className="mt-8 flex items-end gap-4">
                  <p className="font-serif text-3xl leading-none text-paper">
                    <span className="sr-only">Sale price </span>
                    <span className="tabular-nums">$97</span>
                  </p>
                  <p className="font-sans text-lg leading-none text-slate">
                    <span className="sr-only">Regular price </span>
                    <s className="tabular-nums">$179</s>
                  </p>
                </div>
                <p className="mt-3 font-sans text-base text-slate">
                  Free shipping to the US, UK and Europe.
                </p>

                <div className="mt-6">
                  <BuyButton />
                </div>

                <p className="mt-4 max-w-[54ch] font-sans text-base text-paper">
                  60-day refund. Do the 21 days. If you don’t feel the
                  difference, email{" "}
                  <a href={`mailto:${siteConfig.email}`} className="link">
                    {siteConfig.email}
                  </a>{" "}
                  within 60 days of your order and we’ll refund every cent.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section
          id="faq"
          aria-labelledby="faq-title"
          className="defer-render container-page py-16 md:py-24"
        >
          <div className="lg:grid lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-4">
              <h2 id="faq-title" className="font-serif text-3xl text-paper">
                Questions and answers
              </h2>
              <p className="mt-4 font-sans text-lg text-slate">
                Short answers to the things people ask before they start.
              </p>
            </div>

            <div className="faq mt-12 lg:col-span-7 lg:col-start-6 lg:mt-0">
              {faqs.map((faq) => (
                <details
                  key={faq.question}
                  className="border-t border-line last:border-b"
                >
                  <summary>
                    <span className="font-serif text-xl text-paper">
                      {faq.question}
                    </span>
                    <svg
                      aria-hidden="true"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      className="faq-icon"
                    >
                      <line x1="5" y1="12" x2="19" y2="12" />
                      <line
                        x1="12"
                        y1="5"
                        x2="12"
                        y2="19"
                        className="faq-icon__vertical"
                      />
                    </svg>
                  </summary>
                  <div className="pb-6 font-sans text-lg text-slate">
                    {faq.question === "How does the guarantee work?" ? (
                      <p>
                        Email{" "}
                        <a
                          href={`mailto:${siteConfig.email}`}
                          className="link"
                        >
                          {siteConfig.email}
                        </a>{" "}
                        within 60 days of your order and we’ll refund every
                        cent.
                      </p>
                    ) : (
                      <p>{faq.answer}</p>
                    )}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section
          id="start"
          aria-labelledby="start-title"
          className="defer-render relative isolate overflow-hidden border-y border-line"
        >
          <div className="absolute inset-0 -z-20">
            <Media
              src={images.door.src}
              alt={images.door.alt}
              width={images.door.width}
              height={images.door.height}
              className="h-full w-full"
              imageClassName="object-[76%_50%] lg:object-center"
              sizes="100vw"
            />
          </div>
          <div
            aria-hidden="true"
            className="absolute inset-0 -z-10 bg-ink/85 md:bg-gradient-to-r md:from-ink md:via-ink/90 md:to-ink/25"
          />
          <div className="container-page py-24 md:py-32">
            <div className="max-w-[46rem]">
              <h2
                id="start-title"
                className="font-serif text-3xl text-paper md:text-4xl"
              >
                Start Day 1 tonight.
              </h2>
              <p className="mt-4 font-sans text-lg text-paper">
                21 days. About twenty minutes a day.
              </p>
              <div className="mt-8">
                <BuyButton />
              </div>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
      <StickyBuyBar checkoutUrl={siteConfig.checkoutUrl} />
    </div>
  );
}
