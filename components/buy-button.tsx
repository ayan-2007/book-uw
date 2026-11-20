import { siteConfig } from "@/lib/site";

type BuyButtonProps = {
  variant?: "primary" | "secondary";
  className?: string;
};

export function BuyButton({
  variant = "primary",
  className = "",
}: BuyButtonProps) {
  const variantClass = variant === "primary" ? "btn-primary" : "btn-secondary";

  return (
    <a
      href={siteConfig.checkoutUrl}
      className={`btn ${variantClass} ${className}`.trim()}
    >
      {siteConfig.buyLabel}
    </a>
  );
}
