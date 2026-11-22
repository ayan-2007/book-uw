import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export default function NotFound() {
  return (
    <div id="top" className="site-wrapper">
      <SiteHeader showBuy={false} />

      <main id="main-content" className="page">
        <div className="container">
          <div className="page__header">
            <span className="kicker">404</span>
            <h1 className="page__title">Page not found</h1>
            <p className="page__lead">
              The page you’re looking for doesn’t exist. The book and its
              policies are still here.
            </p>
            <div className="hero__actions">
              <a href="/" className="btn btn-primary">
                Go to the homepage
              </a>
              <a href="/policies" className="btn btn-ghost">
                Read the policies
              </a>
            </div>
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
