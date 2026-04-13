import type { Metadata } from "next";

const siteUrl = "https://tool-pilot.in";
const pagePath = "/calculators/discount-calculator";

const title = "Discount Calculator — Sale Price & Double Discounts | ToolPilot";
const description =
  "Free discount calculator: apply one or two sequential percentage discounts, optional tax on the final price, and see discount amounts and totals with clear number formatting.";

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title,
    description,
    type: "website",
    url: `${siteUrl}${pagePath}`,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "ToolPilot Discount Calculator",
      applicationCategory: "FinanceApplication",
      operatingSystem: "Any",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "INR",
      },
      description:
        "Compute sale prices with single or stacked percentage discounts and optional tax—no sign-up required.",
      url: `${siteUrl}${pagePath}`,
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "Is tax calculated before or after the discount?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Tax uses the post-discount price as the base. If your jurisdiction taxes the pre-discount amount, adjust outside this tool or enter numbers that match your receipt rules.",
          },
        },
        {
          "@type": "Question",
          name: 'Why is "20% + 10% off" not the same as 30% off?',
          acceptedAnswer: {
            "@type": "Answer",
            text: "Sequential discounts multiply remaining price by (1 − each rate). Thirty percent off the original is a single step. Stacked promos almost always apply in order on the running price.",
          },
        },
        {
          "@type": "Question",
          name: "Can I enter more than two discounts?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "This page supports one or two chained percentages. For three or more, multiply by each (1 − p/100) factor in order, or use the single mode repeatedly by hand.",
          },
        },
      ],
    },
  ],
};

export default function DiscountCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {children}
    </>
  );
}
