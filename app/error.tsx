"use client";

type ErrorPageProps = {
  reset: () => void;
};

export default function ErrorPage({ reset }: ErrorPageProps) {
  return (
    <div id="top">
      <header className="site-header">
        <div className="container-page site-header__inner">
          <a href="/" className="site-header__wordmark">
            The Limitless Black Book
          </a>
        </div>
      </header>

      <main id="main-content" className="container-page py-24 md:py-32">
        <div className="max-w-letter">
          <h1 className="font-serif text-3xl text-paper">
            This page couldn’t load
          </h1>
          <p className="mt-4 font-sans text-lg text-paper">
            Try again. If it keeps happening, go back to the homepage.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-6">
            <button type="button" onClick={reset} className="btn btn-primary">
              Try again
            </button>
            <a href="/" className="link font-sans text-base">
              Go to the homepage
            </a>
          </div>
        </div>
      </main>

      <footer className="border-t border-line">
        <div className="container-page py-12">
          <p className="font-sans text-base text-paper">
            For education, not medical advice.
          </p>
        </div>
      </footer>
    </div>
  );
}
