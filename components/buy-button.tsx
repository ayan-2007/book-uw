import { siteConfig } from "@/lib/site";

type BuyButtonProps = {
  variant?: "primary" | "secondary";
  className?: string;
  onClick?: () => void;
  children?: React.ReactNode;
};

export function BuyButton({
  variant = "primary",
  className = "",
  onClick,
  children,
}: BuyButtonProps) {
  const variantClass = variant === "primary" ? "btn-primary" : "btn-secondary";

  return (
    <a
      href={siteConfig.checkoutUrl}
      className={`btn ${variantClass} ${className}`.trim()}
      onClick={onClick}
    >
      {children || siteConfig.buyLabel}
    </a>
  );
}
