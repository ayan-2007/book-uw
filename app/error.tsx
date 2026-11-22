"use client";

type ErrorPageProps = {
  reset: () => void;
};

export default function ErrorPage({ reset }: ErrorPageProps) {
  return (
    <div id="top" className="site-wrapper">
      <header className="site-header">
        <div className="container site-header__inner">
          <a href="/" className="brand">
            <span className="brand__name">The Limitless Black Book</span>
            <span className="brand__sub">Farhan Khawaja, PhD</span>
          </a>
        </div>
      </header>

      <main id="main-content" className="page">
        <div className="container">
          <div className="page__header">
            <span className="kicker">Something went wrong</span>
            <h1 className="page__title">This page couldn’t load.</h1>
            <p className="page__lead">
              Try again. If it keeps happening, go back to the homepage.
            </p>
            <div className="hero__actions">
              <button type="button" onClick={reset} className="btn btn-primary">
                Try again
              </button>
              <a href="/" className="btn btn-ghost">
                Go to the homepage
              </a>
            </div>
          </div>
        </div>
      </main>

      <footer className="footer">
        <div className="container">
          <p className="footer__legal">For education, not medical advice.</p>
        </div>
      </footer>
    </div>
  );
}
