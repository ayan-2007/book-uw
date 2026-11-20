export const siteConfig = {
  name: "The Limitless Black Book",
  author: "Farhan Khawaja, PhD",
  authorRole: "Neuroscientist",
  email: "support@aphro-d.com",
  price: "$97",
  compareAtPrice: "$179",
  checkoutUrl:
    process.env.NEXT_PUBLIC_CHECKOUT_URL?.trim() || "#offer",
  siteUrl:
    process.env.NEXT_PUBLIC_SITE_URL?.trim() ||
    "https://thelimitlessblackbook.com",
  buyLabel: "Get the hardcover, $97",
} as const;
