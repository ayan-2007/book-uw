import { BuyButton } from "@/components/buy-button";
import { Countdown } from "@/components/countdown";
import { siteConfig } from "@/lib/site";

type SiteHeaderProps = {
  showBuy?: boolean;
};

export function SiteHeader({ showBuy = true }: SiteHeaderProps) {
  const saleEnd = process.env.NEXT_PUBLIC_SALE_END?.trim();

  return (
    <header className="site-header">
      <div className="container-page site-header__inner">
        <a href="/" className="site-header__wordmark">
          {siteConfig.name}
        </a>

        <div className="flex items-center gap-4">
          {saleEnd ? (
            <div className="hidden lg:block">
              <Countdown endDate={saleEnd} />
            </div>
          ) : null}
          {showBuy ? (
            <div className="hidden md:block">
              <BuyButton variant="secondary" />
            </div>
          ) : null}
        </div>
      </div>
    </header>
  );
}
