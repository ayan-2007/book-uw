import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export default function NotFound() {
  return (
    <div id="top">
      <SiteHeader showBuy={false} />
      <main id="main-content" className="container-page py-24 md:py-32">
        <div className="max-w-letter">
          <h1 className="font-serif text-3xl text-paper">Page not found</h1>
          <p className="mt-4 font-sans text-lg text-paper">
            The page you’re looking for doesn’t exist. The book and its policies
            are still here.
          </p>
          <div className="mt-8">
            <a href="/" className="btn btn-secondary">
              Go to the homepage
            </a>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
