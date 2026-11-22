import { siteConfig } from "@/lib/site";

type BuyButtonProps = {
  variant?: "primary" | "secondary" | "inverse";
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
  const variantClass =
    variant === "inverse"
      ? "btn-inverse"
      : variant === "secondary"
        ? "btn-secondary"
        : "btn-primary";

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
